import React, { useEffect, useState } from 'react'
import { createPublicClient, http, formatEther } from 'viem'
import { base } from 'wagmi/chains'

const client = createPublicClient({ chain: base, transport: http('https://mainnet.base.org') })

const TREASURY_ADDRESSES = [
  '0x318d906edcED8C1661341C9f1D612Ca57A57DC55',
  '0xC43B320A9Da13a0d5521fE5CF37E847c0584405B',
]

export default function TreasuryBalances() {
  const [balances, setBalances] = useState<{address:string, eth:string}[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const run = async () => {
      try {
        const out: {address:string, eth:string}[] = []
        for (const a of TREASURY_ADDRESSES) {
          const bal = await client.getBalance({ address: a as `0x${string}` })
          out.push({ address: a, eth: Number(formatEther(bal)).toFixed(6) })
        }
        setBalances(out)
      } catch {
        setError('Unable to fetch balances right now.')
      }
    }
    run()
  }, [])

  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Treasury Balances (ETH)</h2>
      {error && <p className="status-error">{error}</p>}
      {balances.length === 0 && !error && <p>Loading…</p>}
      {balances.length > 0 && (
        <ul style={{ listStyle:'none', padding:0 }}>
          {balances.map(b => (
            <li key={b.address} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #30363d' }}>
              <span style={{ opacity: 0.8 }}>{b.address}</span>
              <strong>{b.eth} ETH</strong>
            </li>
          ))}
        </ul>
      )}
      <p style={{ opacity:0.7, fontSize:12 }}>Data via Base public RPC. I’ll swap to internal tools later.</p>
    </section>
  )
}
