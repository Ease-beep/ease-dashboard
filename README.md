# EASE Dashboard

Live build (direct deploy): https://ease-dashboard-direct-9lfup6t8f-ease-beeps-projects.vercel.app

GitHub → Vercel (auto-deploy) project: `ease-dashboard` (Vite)
- Build: `npm run build`
- Output: `dist`
- Env: (optional) `VITE_WALLETCONNECT_PROJECT_ID` for QR wallets. Injected wallets work without it.

## Local dev
```
npm install
npm run dev
```

## Notes
- Injected-only wallet mode is enabled by default (MetaMask/Coinbase browser).
- To enable WalletConnect QR later, add the env var in Vercel and redeploy.
