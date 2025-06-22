import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../../shared/services/firebase'

export interface PatientPrescription {
  id: string
  doctorId: string
  doctorName: string
  patientId: string
  patientName: string
  appointmentId: string
  medications: string
  dosage: string
  instructions: string
  duration: string
  observations?: string
  issueDate: string
  fileName: string
}

export async function getPatientPrescriptions(patientId: string): Promise<PatientPrescription[]> {
  try {
    const q = query(
      collection(db, 'prescriptions'),
      where('patientId', '==', patientId),
      orderBy('issueDate', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PatientPrescription[]
  } catch (error) {
    console.error('Erro ao buscar prescrições do paciente:', error)
    throw error
  }
}

export async function getPatientIdFromUid(uid: string): Promise<string | null> {
  try {
    const patientsQuery = query(collection(db, 'patients'), where('uid', '==', uid))
    const patientsSnapshot = await getDocs(patientsQuery)
    
    if (!patientsSnapshot.empty) {
      return patientsSnapshot.docs[0].id
    }

    const usersQuery = query(collection(db, 'users'), where('uid', '==', uid))
    const usersSnapshot = await getDocs(usersQuery)
    
    if (!usersSnapshot.empty) {
      return usersSnapshot.docs[0].id
    }

    return null
  } catch (error) {
    console.error('Erro ao buscar ID do paciente:', error)
    return null
  }
} 