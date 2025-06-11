import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/db'
import { hashPassword, validateEmail } from '../../lib/utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password, confirmPassword } = req.body

  // Validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    
    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
      }
    })

    // Create free subscription for new user
    await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeCustomerId: `temp_${user.id}`, // Will be updated when user subscribes
        status: 'free',
        planType: 'free',
      }
    })

    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user.id, email: user.email }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 