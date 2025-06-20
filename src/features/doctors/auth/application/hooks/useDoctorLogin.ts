import { useState } from 'react'
import { loginDoctorUser } from '../useCases/loginDoctorUser'

export function useDoctorLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function execute(data: { crm: string; password: string }) {
    setLoading(true)
    setError(null)
    try {
      const user = await loginDoctorUser(data)
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
