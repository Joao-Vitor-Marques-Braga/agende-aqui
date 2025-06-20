import { useEffect, useState } from 'react'
import { fetchAvailableDoctors } from '../../infrastructure/doctorService'

export function useAvailableDoctors() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAvailableDoctors()
      .then(setDoctors)
      .finally(() => setLoading(false))
  }, [])

  return { doctors, loading }
}