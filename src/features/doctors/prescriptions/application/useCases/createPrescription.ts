import { prescriptionValidationSchema } from '../../domain/validations/prescriptionValidation'
import { createPrescription, type PrescriptionData } from '../../infrastructure/prescriptionService'
import { auth } from '../../../../../shared/services/firebase'

export interface CreatePrescriptionInput {
  patientId: string
  patientName: string
  appointmentId: string
  prescriptionData: PrescriptionData
}

export async function createPrescriptionUseCase(data: CreatePrescriptionInput) {
  try {
    await prescriptionValidationSchema.validate(data.prescriptionData)
    
    const user = auth.currentUser
    if (!user) {
      throw new Error('Médico não está logado')
    }

    const doctorName = user.displayName || 'Médico não identificado'
    
    const prescription = await createPrescription({
      doctorId: user.uid,
      doctorName,
      patientId: data.patientId,
      patientName: data.patientName,
      appointmentId: data.appointmentId,
      prescriptionData: data.prescriptionData
    })

    return prescription
  } catch (error) {
    console.error('Erro no caso de uso createPrescription:', error)
    throw error
  }
} 