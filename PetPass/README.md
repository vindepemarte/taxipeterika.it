# PetPass - Passaporto Digitale per Animali

Il passaporto digitale per il tuo amico a quattro zampe. Sempre con te, sempre accessibile.

## Features

- 🐾 **Passaporto Digitale**: Crea profili completi per i tuoi animali domestici
- 🔒 **Campi Protetti**: Proteggi informazioni sensibili con password
- 📱 **QR Code**: Accesso istantaneo tramite QR code, senza app da scaricare
- 🏷️ **Tag Metallico**: Tag fisico personalizzato con QR code inciso
- 💳 **Abbonamenti**: Piani flessibili con integrazione Stripe
- 📧 **Notifiche Email**: Sistema di notifiche integrato

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **QR Code**: qrcode library
- **Email**: Nodemailer

## Setup

### 1. Clone e Installa Dipendenze

```bash
git clone <repository-url>
cd petpass
npm install
```

### 2. Configura Variabili d'Ambiente

Copia `env.example` in `.env.local` e compila le variabili:

```bash
cp env.example .env.local
```

Configura le seguenti variabili:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/petpass_db?schema=public"

# NextAuth.js
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="https://taxipeterika.it"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_MONTHLY_PRICE_ID="price_..."
STRIPE_ANNUAL_PRICE_ID="price_..."

# Email Configuration
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your_email_user"
EMAIL_SERVER_PASSWORD="your_email_password"
EMAIL_FROM="noreply@taxipeterika.it"

# App URL
APP_URL="https://taxipeterika.it"
```

### 3. Setup Database

```bash
# Genera il client Prisma
npm run db:generate

# Esegui le migrazioni (quando il DB è pronto)
npm run db:migrate

# Opzionale: Apri Prisma Studio
npm run db:studio
```

### 4. Crea Directory per QR Codes

```bash
mkdir -p public/qrcodes
```

### 5. Avvia il Server di Sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:3006](http://localhost:3006).

## Struttura del Progetto

```
petpass/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css         # Stili globali
│   ├── layout.tsx          # Layout root
│   ├── page.tsx            # Homepage
│   ├── login/              # Pagina login
│   ├── register/           # Pagina registrazione
│   ├── dashboard/          # Dashboard utente
│   └── petpass/[id]/       # Visualizzazione PetPass
├── components/             # Componenti React
│   ├── ui/                 # Componenti UI base
│   ├── Header.tsx          # Header navigazione
│   └── Footer.tsx          # Footer
├── lib/                    # Utilities
│   ├── db.ts              # Client Prisma
│   ├── authOptions.ts     # Configurazione NextAuth
│   └── utils.ts           # Funzioni utility
├── pages/api/             # API Routes
│   ├── auth/              # Autenticazione
│   ├── register.ts        # Registrazione utenti
│   └── petpass/           # API PetPass
├── prisma/                # Schema database
│   └── schema.prisma      # Modelli Prisma
├── public/                # File statici
│   └── qrcodes/          # QR codes generati
└── env.example           # Template variabili d'ambiente
```

## Funzionalità Principali

### Creazione PetPass

1. **Dati Anagrafici Pet**: Nome, specie, razza, sesso, data nascita, etc.
2. **Contatti Proprietario**: Nome, indirizzo, telefono, email, contatti emergenza
3. **Informazioni Sanitarie**: Condizioni mediche, allergie, farmaci, note
4. **Sicurezza e Personalizzazione**: Password protezione, colore background

### Visualizzazione Pubblica

- Accesso tramite QR code o URL diretto
- Campi protetti da password mostrati solo dopo verifica
- Design responsive e accessibile
- Possibilità di contattare il proprietario

### Dashboard Utente

- Elenco di tutti i PetPass dell'utente
- Creazione e modifica PetPass
- Gestione abbonamenti
- Ordine tag metallici

## Deployment

### Variabili d'Ambiente Produzione

Assicurati di configurare tutte le variabili d'ambiente per la produzione:

- `DATABASE_URL`: URL del database PostgreSQL
- `NEXTAUTH_SECRET`: Segreto per NextAuth.js
- `NEXTAUTH_URL`: URL dell'applicazione in produzione
- Credenziali Stripe per pagamenti
- Configurazione email SMTP

### Database

1. Configura un database PostgreSQL
2. Esegui le migrazioni: `npm run db:migrate`
3. Genera il client: `npm run db:generate`

### File Statici

Assicurati che la directory `public/qrcodes/` sia writable per la generazione dei QR codes.

## Contribuire

1. Fork del repository
2. Crea un branch per la feature: `git checkout -b feature/nome-feature`
3. Commit delle modifiche: `git commit -am 'Aggiunge feature'`
4. Push del branch: `git push origin feature/nome-feature`
5. Crea una Pull Request

## Licenza

© 2024 Taxi Pet Erika. Tutti i diritti riservati. 