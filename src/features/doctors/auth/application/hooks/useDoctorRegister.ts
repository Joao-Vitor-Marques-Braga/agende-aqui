import { useState } from 'react'
import { registerDoctorUser } from '../useCases/registerDoctorUser'

export function useDoctorRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function execute(data: any) {
    setLoading(true)
    setError(null)
    try {
      const user = await registerDoctorUser(data)
      return user
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading, error }
}
