import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../../../../shared/services/firebase'
import { clinicDoctorRegisterSchema } from '../../domain/validation/clinicDoctorRegisterValidation'
import { registerDoctorByClinic, type RegisterDoctorByClinicData } from '../../infrastructure/clinicDoctorService'

export interface RegisterDoctorByClinicInput {
  name: string
  crm: string
  specialty: string
  email: string
  password: string
  phone: string
}

export async function registerDoctorByClinicUseCase(data: RegisterDoctorByClinicInput) {
  try {
    await clinicDoctorRegisterSchema.validate(data)
    
    const user = auth.currentUser
    if (!user) {
      throw new Error('Clínica não está logada')
    }
    
    console.log('Usuário logado encontrado:', user.uid)
    
    const clinicQuery = query(
      collection(db, 'clinics'),
      where('uid', '==', user.uid),
      where('role', '==', 'clinica')
    )
    
    const clinicSnapshot = await getDocs(clinicQuery)
    
    if (clinicSnapshot.empty) {
      console.log('Query da clínica retornou vazio para UID:', user.uid)
      throw new Error('Clínica não encontrada')
    }
    
    const clinicData = clinicSnapshot.docs[0].data()
    const clinicId = clinicSnapshot.docs[0].id
    
    console.log('Clínica encontrada:', clinicData.name, 'ID:', clinicId)
    
    const crmQuery = query(
      collection(db, 'doctors'),
      where('crm', '==', data.crm),
      where('role', '==', 'medico')
    )
    
    const crmSnapshot = await getDocs(crmQuery)
    
    if (!crmSnapshot.empty) {
      throw new Error('Já existe um médico cadastrado com este CRM')
    }

    const registrationData: RegisterDoctorByClinicData = {
      ...data,
      clinicId,
      clinicName: clinicData.name
    }
    
    const result = await registerDoctorByClinic(registrationData)
    console.log('UseCase concluído com sucesso')
    
    return result
    
  } catch (error) {
    console.error('Erro no useCase registerDoctorByClinic:', error)
    throw error
  }
} 