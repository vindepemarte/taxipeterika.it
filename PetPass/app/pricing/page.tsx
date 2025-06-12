'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PricingCard } from '@/components/PricingCard'
import { Button } from '@/components/ui/Button'

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const handleUpgrade = async (priceId: string, planName: string) => {
    if (!session) {
      router.push('/login')
      return
    }

    setLoading(planName)
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planName,
          billingPeriod,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(null)
    }
  }

  const pricingPlans = [
    {
      title: 'Free',
      price: '€0',
      period: billingPeriod === 'monthly' ? 'mese' : 'anno',
      description: 'Perfetto per iniziare con il tuo primo pet',
      features: [
        { text: '1 PetPass gratuito', included: true },
        { text: 'Profilo base del pet', included: true },
        { text: 'Codice QR personalizzato', included: true },
        { text: 'Accesso via web', included: true },
        { text: 'Tag metallici', included: false },
        { text: 'Supporto prioritario', included: false },
        { text: 'Analytics avanzati', included: false },
      ],
      buttonText: 'Piano Attuale',
      buttonVariant: 'secondary' as const,
      priceId: null,
      planName: 'free',
      popular: false,
    },
    {
      title: 'Pro',
      price: billingPeriod === 'monthly' ? '€9.99' : '€99.99',
      period: billingPeriod === 'monthly' ? 'mese' : 'anno',
      description: 'Ideale per famiglie con più animali',
      features: [
        { text: '5 PetPass inclusi', included: true },
        { text: 'Profili completi dei pet', included: true },
        { text: 'Codici QR personalizzati', included: true },
        { text: 'Tag metallici inclusi', included: true },
        { text: 'Supporto prioritario', included: true },
        { text: 'Backup cloud', included: true },
        { text: 'Analytics avanzati', included: false },
      ],
      buttonText: 'Inizia Pro',
      buttonVariant: 'primary' as const,
      priceId: billingPeriod === 'monthly' ? 'price_pro_monthly' : 'price_pro_yearly',
      planName: 'pro',
      popular: true,
    },
    {
      title: 'Business',
      price: billingPeriod === 'monthly' ? '€19.99' : '€199.99',
      period: billingPeriod === 'monthly' ? 'mese' : 'anno',
      description: 'Per veterinari e attività commerciali',
      features: [
        { text: 'PetPass illimitati', included: true },
        { text: 'Branding personalizzato', included: true },
        { text: 'Dashboard aziendale', included: true },
        { text: 'Tag metallici illimitati', included: true },
        { text: 'Supporto prioritario 24/7', included: true },
        { text: 'Analytics avanzati', included: true },
        { text: 'API per integrazioni', included: true },
      ],
      buttonText: 'Inizia Business',
      buttonVariant: 'primary' as const,
      priceId: billingPeriod === 'monthly' ? 'price_business_monthly' : 'price_business_yearly',
      planName: 'business',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Scegli il piano perfetto per te
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Proteggi i tuoi amici a quattro zampe con PetPass. Piani flessibili per ogni esigenza.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`text-sm font-medium mr-3 ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensile
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                billingPeriod === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ml-3 ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annuale
            </span>
            {billingPeriod === 'yearly' && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Risparmia 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="flex">
              <PricingCard
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                buttonText={loading === plan.planName ? 'Caricamento...' : plan.buttonText}
                buttonVariant={plan.planName === 'free' ? 'secondary' : 'primary'}
                popular={plan.popular}
                disabled={loading === plan.planName || plan.planName === 'free'}
                onSelect={() => plan.priceId && handleUpgrade(plan.priceId, plan.planName)}
              />
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tutto quello che ti serve per proteggere i tuoi pet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sicurezza Garantita</h3>
              <p className="text-gray-600">I dati dei tuoi pet sono protetti con crittografia avanzata</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accesso Istantaneo</h3>
              <p className="text-gray-600">Scansiona il QR code per accedere immediatamente alle info</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Supporto 24/7</h3>
              <p className="text-gray-600">Il nostro team è sempre pronto ad aiutarti</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Domande Frequenti
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Posso cambiare piano in qualsiasi momento?
              </h3>
              <p className="text-gray-600">
                Sì, puoi aggiornare o downgrade il tuo piano in qualsiasi momento dalla tua dashboard.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                I tag metallici sono inclusi?
              </h3>
              <p className="text-gray-600">
                I tag metallici sono inclusi nei piani Pro e Business. Per il piano Free sono disponibili a €19.99 ciascuno.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cosa succede se cancello l'abbonamento?
              </h3>
              <p className="text-gray-600">
                I tuoi PetPass rimarranno attivi fino alla fine del periodo di fatturazione, poi tornerai al piano Free.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto a proteggere i tuoi amici a quattro zampe?
          </h2>
          <p className="text-gray-600 mb-6">
            Unisciti a migliaia di proprietari di animali che hanno già scelto PetPass
          </p>
          {!session ? (
            <Button size="lg" onClick={() => router.push('/register')}>
              Inizia Ora Gratis
            </Button>
          ) : (
            <Button size="lg" onClick={() => router.push('/dashboard')}>
              Vai alla Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 