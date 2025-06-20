import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../../../shared/services/firebase'
import { registerDoctorByClinicUseCase, type RegisterDoctorByClinicInput } from '../useCases/registerDoctorByClinic'

export function useRegisterDoctorByClinic() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  async function execute(data: RegisterDoctorByClinicInput) {
    setLoading(true)
    setError(null)
    setFieldErrors({})
    setSuccess(false)
    
    try {
      console.log('Executando registro de médico pela clínica...')
      
      // Aguarda a autenticação estar pronta
      await new Promise<void>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe() // Remove o listener imediatamente
          if (user) {
            console.log('Autenticação confirmada para:', user.uid)
            resolve()
          } else {
            reject(new Error('Usuário não está autenticado'))
          }
        })
        
        // Timeout de segurança
        setTimeout(() => {
          unsubscribe()
          reject(new Error('Timeout na verificação de autenticação'))
        }, 5000)
      })
      
      const result = await registerDoctorByClinicUseCase(data)
      console.log('Médico registrado com sucesso:', result)
      setSuccess(true)
      return result
    } catch (err: any) {
      console.error('Erro no hook useRegisterDoctorByClinic:', err)
      
      // Se for erro de validação do Yup
      if (err.name === 'ValidationError') {
        if (err.path) {
          setFieldErrors({ [err.path]: err.message })
        } else {
          setError(err.message)
        }
      } else {
        // Outros erros (Firebase, busca no Firestore, etc.)
        setError(err.message || 'Erro inesperado ao cadastrar médico')
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
    setFieldErrors({})
    setSuccess(false)
  }

  const clearSuccess = () => {
    setSuccess(false)
  }

  return { 
    execute, 
    loading, 
    error, 
    fieldErrors, 
    success,
    clearError,
    clearSuccess
  }
} 