import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../lib/authOptions'
import { prisma } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ message: 'Non autorizzato' })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' })
    }

    const subscription = user.subscriptions[0] || {
      status: 'free',
      planType: 'free',
      stripeCustomerId: `temp_${user.id}`,
      currentPeriodStart: null,
      currentPeriodEnd: null
    }

    res.status(200).json({ subscription })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    res.status(500).json({ 
      message: 'Errore interno del server',
      error: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
} 