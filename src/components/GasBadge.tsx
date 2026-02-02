import React, { useEffect, useState } from 'react'
import { createPublicClient, http, formatGwei } from 'viem'
import { baseSepolia } from 'wagmi/chains'

const client = createPublicClient({ chain: baseSepolia, transport: http('https://sepolia.base.org') })

export default function GasBadge() {
  const [gas, setGas] = useState<string>('—')
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')

  useEffect(() => {
    const run = async () => {
      try {
        const price = await client.getGasPrice()
        setGas(formatGwei(price) + ' gwei')
        setStatus('ok')
      } catch {
        setStatus('err')
        setGas('n/a')
      }
    }
    run()
    const t = setInterval(run, 30000)
    return () => clearInterval(t)
  }, [])

  const bg = status === 'ok' ? '#1f6feb' : status === 'err' ? '#f85149' : '#444'

  return (
    <span style={{ background: bg, color:'#fff', borderRadius: 14, padding: '6px 10px', fontSize: 12 }}>
      Base Sepolia Gas: {gas}
    </span>
  )
}
