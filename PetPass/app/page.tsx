'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Il <span className="text-blue-600">Passaporto Digitale</span><br />
              per il Tuo Amico a Quattro Zampe
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              PetPass è la soluzione innovativa per tenere sempre con te tutte le informazioni 
              importanti del tuo animale domestico. Sicuro, accessibile e sempre aggiornato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Vai alla Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Inizia Ora
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Accedi
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perché Scegliere PetPass?
            </h2>
            <p className="text-lg text-gray-600">
              Una soluzione completa per la gestione digitale del tuo animale domestico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pace della Mente
              </h3>
              <p className="text-gray-600">
                Tutte le informazioni del tuo pet sempre accessibili in caso di emergenza
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Convenienza
              </h3>
              <p className="text-gray-600">
                Accesso istantaneo tramite QR code, senza app da scaricare
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sicurezza
              </h3>
              <p className="text-gray-600">
                Campi protetti da password per informazioni sensibili
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Scegli il Piano Perfetto per il Tuo PetPass
            </h2>
            <p className="text-lg text-gray-600">
              Piani flessibili per ogni esigenza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 relative">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Piano Mensile
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">€9.99</span>
                  <span className="text-gray-600">/mese</span>
                </div>
                <p className="text-gray-600 mb-6">
                  <span className="line-through text-gray-400">€19.99</span> - Offerta di lancio
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Primo PetPass incluso
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Tutti i campi disponibili
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    QR Code personalizzato
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Aggiornamenti illimitati
                  </li>
                </ul>

                <Link href={session ? "/dashboard" : "/register"}>
                  <Button className="w-full">
                    Inizia Ora
                  </Button>
                </Link>
              </div>
            </div>

            {/* Annual Plan */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Più Popolare
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Piano Annuale
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">€49.99</span>
                  <span className="text-gray-600">/anno</span>
                </div>
                <p className="text-gray-600 mb-6">
                  <span className="line-through text-gray-400">€239.99</span> - Risparmia il 79%
                </p>

                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Primo PetPass incluso
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Tutti i campi disponibili
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    QR Code personalizzato
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Aggiornamenti illimitati
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">★</span>
                    <span className="font-medium">Massimo risparmio</span>
                  </li>
                </ul>

                <Link href={session ? "/dashboard" : "/register"}>
                  <Button className="w-full">
                    Inizia Ora
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional PetPass */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              <strong>PetPass aggiuntivi:</strong> €5.99/mese o €29.99/anno ciascuno
            </p>
          </div>
        </div>
      </div>

      {/* Metal Tag Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Il Tuo QR Code Sempre Con Te
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ordina il tag metallico personalizzato con il QR code del tuo PetPass. 
                Resistente, elegante e sempre leggibile.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Materiale resistente alle intemperie</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">QR code inciso laser</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Personalizzabile con nome del pet</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Spedizione inclusa</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">€19.99</span>
                  <span className="text-gray-600">+ spedizione</span>
                </div>
                <Link href={session ? "/dashboard" : "/register"}>
                  <Button className="w-full">
                    Acquista il Tag
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img 
                src="https://via.placeholder.com/400x400?text=Metal+Tag+QR" 
                alt="Tag Metallico PetPass" 
                className="rounded-lg shadow-lg max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 