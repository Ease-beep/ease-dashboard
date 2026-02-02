import React, { useEffect, useState } from 'react'

// Demo addresses (public). Replace with real treasury later.
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
        const results: {address:string, eth:string}[] = []
        for (const a of TREASURY_ADDRESSES) {
          const res = await fetch(`https://api.basescan.org/api?module=account&action=balance&address=${a}`)
          const data = await res.json()
          const wei = BigInt(data?.result || '0')
          const eth = Number(wei) / 1e18
          results.push({ address: a, eth: eth.toFixed(6) })
        }
        setBalances(results)
      } catch (e) {
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
      <p style={{ opacity:0.7, fontSize:12 }}>Data via BaseScan public API (demo). I’ll swap to our on-chain tools when ready.</p>
    </section>
  )
}
