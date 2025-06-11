import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

export function generatePetPassCode(): string {
  return randomBytes(6).toString('hex').toUpperCase()
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
} 