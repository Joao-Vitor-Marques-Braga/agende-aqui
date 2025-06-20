import { useState } from 'react'
import { loginClinics } from '../useCases/loginClinics'

export function useLoginClinics() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function execute(data: { cnpj: string, password: string }) {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Executando login da clínica...')
      const user = await loginClinics(data)
      console.log('Login da clínica concluído com sucesso')
      return user
    } catch (err: any) {
      console.error('Erro no hook useLoginClinics:', err)
      
      if (err.name === 'ValidationError') {
        setError(err.message)
      } else {
        setError(err.message || 'Erro inesperado ao fazer login')
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return { execute, loading, error, clearError }
}
