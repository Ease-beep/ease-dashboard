import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { http } from 'viem'
import RouteEstimator from './components/RouteEstimator'
import BurnNotifier from './components/BurnNotifier'
import BuildInfo from './components/BuildInfo'
import GasBadge from './components/GasBadge'
import TreasuryBalances from './components/TreasuryBalances'

const queryClient = new QueryClient()

// Injected-only mode (no WalletConnect ID required)
const config = getDefaultConfig({
  appName: 'EASE Dashboard',
  projectId: 'injected-only',
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http()
  },
})

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
            <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h1 style={{ margin:0 }}>EASE Dashboard</h1>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <GasBadge />
                <ConnectButton />
              </div>
            </header>
            <div className="card">
              <p>Live and building. Injected wallets (MetaMask/Coinbase browser) supported now. QR can be added later with a WalletConnect ID.</p>
            </div>
            <RouteEstimator />
            <TreasuryBalances />
            <BurnNotifier />
            <BuildInfo />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
