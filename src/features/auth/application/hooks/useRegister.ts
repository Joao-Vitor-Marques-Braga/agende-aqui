import { useState } from 'react'
import { registerUser } from '../useCases/registerUser'

export function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function execute(data: { name: string, email: string, password: string }) {
    setLoading(true)
    setError(null)
    try {
      const user = await registerUser(data)
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
