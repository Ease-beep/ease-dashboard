import React from 'react'

export default function BuildInfo() {
  return (
    <footer style={{ opacity: 0.7, marginTop: 28, fontSize: 12, textAlign: 'center' }}>
      <div>EASE Dashboard • Build: {import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA?.slice(0,7) || 'local'}</div>
      <div>Env: {import.meta.env.MODE}</div>
    </footer>
  )
}
