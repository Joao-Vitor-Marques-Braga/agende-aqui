import { addDoc, collection } from 'firebase/firestore'
import { clinicsRegisterSchema } from '../../domain/validation/clinicsRegisterValidation'
import { createUserWithEmailAndPassword, type AuthError } from 'firebase/auth'
import { auth, db } from '../../../../../shared/services/firebase'

export async function registerClinics(data: {
  name: string
  cnpj: string
  phone: string
  email: string
  password: string
}) {
  try {
    await clinicsRegisterSchema.validate(data)

    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password)

    await addDoc(collection(db, 'clinics'), {
      uid: cred.user.uid,
      name: data.name,
      cnpj: data.cnpj,
      phone: data.phone,
      email: data.email,
      role: 'clinica'
    })

    return cred.user
  } catch (error: any) {
    console.error('Erro no registro da clínica:', error)
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('Este email já está sendo usado por outra conta. Tente fazer login ou use outro email.')
        case 'auth/weak-password':
          throw new Error('A senha é muito fraca. Use pelo menos 6 caracteres.')
        case 'auth/invalid-email':
          throw new Error('Email inválido. Verifique o formato do email.')
        case 'auth/operation-not-allowed':
          throw new Error('Cadastro com email/senha não está habilitado.')
        case 'auth/network-request-failed':
          throw new Error('Erro de conexão. Verifique sua internet e tente novamente.')
        default:
          throw new Error(`Erro de autenticação: ${error.message}`)
      }
    }
    
    if (error.name === 'ValidationError') {
      throw error
    }
    
    throw new Error('Erro inesperado ao cadastrar clínica. Tente novamente.')
  }
}
