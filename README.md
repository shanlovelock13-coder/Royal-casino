# Royal Casino – Expo starter app

A dark, gold-themed, mobile-first social casino prototype using **virtual coins only**.

## Included
- Home, Games, Wallet and Profile tabs
- Demo slot game and virtual coin balance
- Demo daily reward
- Coin bundle display
- Payment method placeholders for Apple in-app purchase, Google Play Billing, PayPal, debit cards, Apple Pay and Google Pay
- No real payment processing, real-money wagering, cash-out or prizes

## Run locally
1. Install Node.js (LTS).
2. Install dependencies: `npm install`
3. Start Expo: `npx expo start`
4. Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

## Before production launch
This is a starter project, not a production-ready or store-approved gambling app. Do not accept payments until the business model, app-store rules and local laws have been reviewed.

### Payments
- Digital virtual currency sold inside iOS apps is generally subject to Apple's in-app purchase rules.
- Digital virtual currency sold inside Android apps is generally subject to Google Play Billing rules.
- PayPal, direct card checkout, Apple Pay and Google Pay may be available only where platform policy and regional alternative-billing rules permit. They are not universal replacements for store billing.
- For any external web checkout, use a compliant payment provider's hosted checkout; never collect or store raw card details in this app.
- Verify all purchases server-side. Never credit coins based only on a client-side success message.
- Add idempotency, receipt validation, refund/revocation handling, fraud controls, audit logs and customer support.
- Use provider sandbox environments first. Store all secrets on a backend, never in the mobile app.

### Backend still required
- Secure account authentication and account deletion
- Server-authoritative wallet ledger
- Purchase receipt verification and coin-credit endpoint
- Transaction history and customer support
- Privacy policy, terms, age-appropriate access controls and responsible-play information
- Monitoring, backups and rate limiting

### Suggested architecture
- Expo / React Native client
- Small API service (e.g. Node.js) with a relational database
- Append-only wallet ledger (credit/debit entries; do not store only a mutable balance)
- Apple / Google receipt validation on the server
- Provider-hosted checkout only where permitted

## Important
Coins in this prototype are local demo values and reset when the app restarts. They have no monetary value and cannot be redeemed, transferred or withdrawn.
