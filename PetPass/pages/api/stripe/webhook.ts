import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { prisma } from '../../../lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  let event: Stripe.Event

  try {
    const sig = req.headers['stripe-signature'] as string
    const body = req.body
    
    event = stripe.webhooks.constructEvent(JSON.stringify(body), sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).json({ message: 'Webhook signature verification failed' })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription') {
          await handleSubscriptionCreated(session)
        }
        break
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          await handlePaymentSucceeded(invoice)
        }
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    res.status(500).json({ message: 'Webhook handler error' })
  }
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const planName = session.metadata?.planName
  
  if (!userId || !planName) {
    console.error('Missing metadata in session:', session.id)
    return
  }

  try {
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId }
    })

    if (existingSubscription) {
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          stripeSubscriptionId: session.subscription as string,
          status: 'active',
          planType: planName,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      })
    }
    
    console.log(`Subscription created for user ${userId}, plan: ${planName}`)
  } catch (error) {
    console.error('Error updating subscription:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
    const customerId = subscription.customer as string
    
    const user = await prisma.user.findFirst({
      where: {
        subscriptions: {
          some: {
            stripeCustomerId: customerId
          }
        }
      },
      include: { subscriptions: true }
    })
    
    if (user?.subscriptions?.[0]) {
      await prisma.subscription.update({
        where: { id: user.subscriptions[0].id },
        data: {
          status: 'active',
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      
      console.log(`Payment succeeded for user ${user.id}`)
    }
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  try {
    const user = await prisma.user.findFirst({
      where: {
        subscriptions: {
          some: {
            stripeCustomerId: customerId
          }
        }
      },
      include: { subscriptions: true }
    })
    
    if (user?.subscriptions?.[0]) {
      await prisma.subscription.update({
        where: { id: user.subscriptions[0].id },
        data: {
          status: subscription.status === 'active' ? 'active' : 'inactive',
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      
      console.log(`Subscription updated for user ${user.id}, status: ${subscription.status}`)
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  try {
    const user = await prisma.user.findFirst({
      where: {
        subscriptions: {
          some: {
            stripeCustomerId: customerId
          }
        }
      },
      include: { subscriptions: true }
    })
    
    if (user?.subscriptions?.[0]) {
      await prisma.subscription.update({
        where: { id: user.subscriptions[0].id },
        data: {
          status: 'free',
          planType: 'free',
          stripeSubscriptionId: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
        },
      })
      
      console.log(`Subscription deleted for user ${user.id}`)
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}

// Disable body parsing, need raw body for Stripe webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
} 