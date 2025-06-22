import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../../shared/services/firebase'

export interface RegisterDoctorByClinicData {
  name: string
  crm: string
  specialty: string
  email: string
  password: string
  phone: string
  clinicId: string
  clinicName: string
}

export async function registerDoctorByClinic(data: RegisterDoctorByClinicData) {
  try {
    console.log('Registrando médico pela clínica:', data.clinicName)
    
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password)
    
    console.log('Usuário criado no Firebase Auth:', cred.user.uid)
    
    await addDoc(collection(db, 'doctors'), {
      uid: cred.user.uid,
      name: data.name,
      crm: data.crm,
      specialty: data.specialty,
      email: data.email,
      phone: data.phone,
      role: 'medico',
      clinicId: data.clinicId,
      clinicName: data.clinicName,
      createdAt: new Date().toISOString(),
      status: 'active'
    })
    
    console.log('Médico cadastrado com sucesso e associado à clínica')
    
    return cred.user
  } catch (error: any) {
    console.error('Erro ao registrar médico pela clínica:', error)
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('Este email já está sendo usado por outra conta.')
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
    
    throw error
  }
} 