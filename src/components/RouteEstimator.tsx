import React from 'react'

export default function RouteEstimator() {
  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Route Estimator (Preview)</h2>
      <p>
        This is a lightweight preview panel. For now it shows guidance only. I’ll upgrade it to real on-chain
        routing when we connect a public quote API.
      </p>
      <ol>
        <li>Connect your wallet (Base Sepolia).</li>
        <li>Pick a token on Base when available.</li>
        <li>I’ll estimate the best route and slippage here.</li>
      </ol>
      <p style={{ opacity: 0.8 }}>No keys required. Safe to use. 🚀</p>
    </section>
  )
}
