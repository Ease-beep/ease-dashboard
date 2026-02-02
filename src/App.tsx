import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { getDefaultConfig, RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { http } from 'viem'

const queryClient = new QueryClient()

// Injected-only mode (no WalletConnect ID required)
const config = getDefaultConfig({
  appName: 'EASE Dashboard',
  projectId: 'injected-only',
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http()
  },
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [] // RainbowKit will show injected wallets automatically
    }
  ]
})

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
            <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h1 style={{ margin:0 }}>EASE Dashboard</h1>
              <ConnectButton />
            </header>
            <div className="card">
              <p>Deployed successfully. Wallet connect supports injected wallets (MetaMask/Coinbase browser). We can enable QR (WalletConnect) later by adding an ID.</p>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
