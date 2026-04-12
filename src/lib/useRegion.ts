'use client'
import { useState, useEffect } from 'react'

export function useRegion() {
  const [region, setRegion] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = sessionStorage.getItem('user_region')
    if (cached) {
      setRegion(cached)
      setLoading(false)
      return
    }

    fetch('/api/region')
      .then(r => r.json())
      .then(data => {
        setRegion(data.region)
        sessionStorage.setItem('user_region', data.region)
        setLoading(false)
      })
      .catch(() => {
        setRegion('Grand Montréal')
        setLoading(false)
      })
  }, [])

  return { region, loading }
}
