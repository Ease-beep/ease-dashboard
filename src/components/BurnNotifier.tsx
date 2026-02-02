import React, { useState } from 'react'

export default function BurnNotifier() {
  const [enabled, setEnabled] = useState(false)
  const [status, setStatus] = useState<string>('')

  const enable = async () => {
    if (!('Notification' in window)) {
      setStatus('Notifications not supported in this browser.')
      return
    }
    let permission = Notification.permission
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }
    if (permission !== 'granted') {
      setStatus('Permission denied. You can enable it in browser settings.')
      return
    }
    setEnabled(true)
    setStatus('Enabled. You will receive a test ping.')
    setTimeout(() => {
      try {
        new Notification('EASE Burn Notifier', {
          body: 'Demo active. Real burn alerts will appear here when hooked to treasury events.',
        })
      } catch {}
    }, 800)
  }

  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Burn Notifier (Demo)</h2>
      <p>Turn this on to allow browser notifications. I’ll wire it to on-chain burn events next.</p>
      <button className="btn btn-primary" onClick={enable} disabled={enabled}>
        {enabled ? 'Notifications Enabled' : 'Enable Notifications'}
      </button>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </section>
  )
}
