import { useState } from 'react'
import { registerClinics } from '../useCases/registerClinics'

export function useRegisterClinics() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function execute(data: { cnpj: string, name: string, phone: string, email: string, password: string }) {
    setLoading(true)
    setError(null)
    setFieldErrors({})
    
    try {
      const user = await registerClinics(data)
      return user
    } catch (err: any) {
      console.error('Erro no hook useRegisterClinics:', err)
      
      if (err.name === 'ValidationError') {
        if (err.path) {
          setFieldErrors({ [err.path]: err.message })
        } else {
          setError(err.message)
        }
      } else {
        setError(err.message || 'Erro inesperado ao cadastrar clínica')
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
    setFieldErrors({})
  }

  return { execute, loading, error, fieldErrors, clearError }
}
