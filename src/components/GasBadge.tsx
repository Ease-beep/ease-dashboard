import React, { useEffect, useState } from 'react'

export default function GasBadge() {
  const [gas, setGas] = useState<string>('—')
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')

  useEffect(() => {
    const fetchGas = async () => {
      try {
        // Simple public endpoint example for demo purposes
        const res = await fetch('https://gas.api.base.org/base-sepolia')
        if (!res.ok) throw new Error('Gas API error')
        const data = await res.json()
        const gwei = Number(data?.recommended?.priorityFee) || Number(data?.legacy?.suggestedMaxPriorityFeePerGas)
        setGas(gwei ? gwei.toFixed(3) + ' gwei' : 'n/a')
        setStatus('ok')
      } catch (e) {
        setGas('n/a')
        setStatus('err')
      }
    }
    fetchGas()
    const t = setInterval(fetchGas, 30000)
    return () => clearInterval(t)
  }, [])

  const bg = status === 'ok' ? '#1f6feb' : status === 'err' ? '#f85149' : '#444'

  return (
    <span style={{ background: bg, color:'#fff', borderRadius: 14, padding: '6px 10px', fontSize: 12 }}>
      Base Sepolia Gas: {gas}
    </span>
  )
}
