import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../lib/authOptions'
import Stripe from 'stripe'
import { prisma } from '../../../lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ message: 'Non autorizzato' })
    }

    const { priceId, planName, billingPeriod } = req.body

    if (!priceId || !planName) {
      return res.status(400).json({ message: 'Parametri mancanti' })
    }

    // Get or create user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscriptions: true }
    })

    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' })
    }

    let customerId = user.subscriptions[0]?.stripeCustomerId

    // Create Stripe customer if doesn't exist
    if (!customerId || customerId.startsWith('temp_')) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: {
          userId: user.id,
        },
      })
      
      customerId = customer.id

      // Update or create subscription with the real Stripe customer ID
      const existingSubscription = await prisma.subscription.findFirst({
        where: { userId: user.id }
      })

      if (existingSubscription) {
        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: { stripeCustomerId: customerId }
        })
      } else {
        await prisma.subscription.create({
          data: {
            userId: user.id,
            stripeCustomerId: customerId,
            status: 'free',
            planType: 'free',
          }
        })
      }
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        planName,
        billingPeriod,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
    })

    res.status(200).json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Errore nella creazione della sessione di checkout:', error)
    res.status(500).json({ 
      message: 'Errore interno del server',
      error: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
} 