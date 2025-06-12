import React from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  buttonText: string
  buttonVariant?: 'primary' | 'secondary' | 'ghost'
  popular?: boolean
  onSelect: () => void
  disabled?: boolean
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant = 'primary',
  popular = false,
  onSelect,
  disabled = false
}: PricingCardProps) {
  return (
    <div className={cn(
      "relative bg-white rounded-lg shadow-md border p-6 flex flex-col h-full",
      popular ? "border-blue-600 border-2" : "border-gray-200",
      "hover:shadow-lg transition-shadow duration-200"
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Più Popolare
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {period && <span className="text-gray-600 ml-1">/{period}</span>}
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="flex-1 mb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5",
                feature.included 
                  ? "bg-green-100 text-green-600" 
                  : "bg-gray-100 text-gray-400"
              )}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  {feature.included ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <span className={cn(
                "text-sm",
                feature.included ? "text-gray-700" : "text-gray-400 line-through"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={buttonVariant}
        className="w-full"
        onClick={onSelect}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  )
} 