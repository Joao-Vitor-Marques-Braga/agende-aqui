import { useState } from 'react'
import { loginUser } from '../useCases/loginUser'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function execute(data: { email: string, password: string }) {
    setLoading(true)
    setError(null)
    try {
      const user = await loginUser(data)
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
