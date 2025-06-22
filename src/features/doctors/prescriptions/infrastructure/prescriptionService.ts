import { collection, getDocs, query, where, orderBy, addDoc } from 'firebase/firestore'
import { db } from '../../../../shared/services/firebase'
import type { Appointment } from '../../dashboard/infrastructure/appointmentService'

export interface PrescriptionData {
  patientName: string
  medications: string
  dosage: string
  instructions: string
  duration: string
  observations?: string
}

export interface Prescription {
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

export async function getCompletedAppointments(doctorId: string): Promise<Appointment[]> {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('status', '==', 'concluida'),
      orderBy('date', 'desc'),
      orderBy('time', 'desc')
    )

    const snapshot = await getDocs(q)
    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Appointment[]

    const appointmentsWithPatientInfo = await Promise.all(
      appointments.map(async (appointment) => {
        try {
          const patientQuery = query(
            collection(db, 'users'),
            where('uid', '==', appointment.patientId)
          )
          const patientSnapshot = await getDocs(patientQuery)
          
          if (!patientSnapshot.empty) {
            const patientData = patientSnapshot.docs[0].data()
            return {
              ...appointment,
              patientName: patientData.name || 'Paciente não identificado'
            }
          }
          
          return appointment
        } catch (error) {
          console.error('Erro ao buscar dados do paciente:', error)
          return appointment
        }
      })
    )

    return appointmentsWithPatientInfo
  } catch (error) {
    console.error('Erro ao buscar consultas concluídas:', error)
    throw error
  }
}

export async function createPrescription(data: {
  doctorId: string
  doctorName: string
  patientId: string
  patientName: string
  appointmentId: string
  prescriptionData: PrescriptionData
}): Promise<Prescription> {
  try {
    const fileName = `receita_${data.patientName.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    
    const prescriptionDoc = {
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      patientId: data.patientId,
      patientName: data.patientName,
      appointmentId: data.appointmentId,
      medications: data.prescriptionData.medications,
      dosage: data.prescriptionData.dosage,
      instructions: data.prescriptionData.instructions,
      duration: data.prescriptionData.duration,
      observations: data.prescriptionData.observations || '',
      issueDate: new Date().toISOString(),
      fileName,
      createdAt: new Date().toISOString()
    }

    const docRef = await addDoc(collection(db, 'prescriptions'), prescriptionDoc)
    
    return {
      id: docRef.id,
      ...prescriptionDoc
    } as Prescription
  } catch (error) {
    console.error('Erro ao criar prescrição:', error)
    throw error
  }
}

export async function getDoctorPrescriptions(doctorId: string): Promise<Prescription[]> {
  try {
    const q = query(
      collection(db, 'prescriptions'),
      where('doctorId', '==', doctorId),
      orderBy('issueDate', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Prescription[]
  } catch (error) {
    console.error('Erro ao buscar prescrições do médico:', error)
    throw error
  }
}

export async function checkPrescriptionExists(appointmentId: string): Promise<Prescription | null> {
  try {
    const q = query(
      collection(db, 'prescriptions'),
      where('appointmentId', '==', appointmentId)
    )

    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const prescription = snapshot.docs[0]
      return {
        id: prescription.id,
        ...prescription.data()
      } as Prescription
    }

    return null
  } catch (error) {
    console.error('Erro ao verificar se prescrição existe:', error)
    throw error
  }
}

export async function getPrescriptionsByAppointments(appointmentIds: string[]): Promise<Record<string, Prescription | null>> {
  try {
    if (appointmentIds.length === 0) return {}

    const prescriptionsMap: Record<string, Prescription | null> = {}
    
    const q = query(
      collection(db, 'prescriptions'),
      where('appointmentId', 'in', appointmentIds)
    )

    const snapshot = await getDocs(q)
    
    appointmentIds.forEach(id => {
      prescriptionsMap[id] = null
    })

    snapshot.docs.forEach(doc => {
      const prescription = {
        id: doc.id,
        ...doc.data()
      } as Prescription
      
      prescriptionsMap[prescription.appointmentId] = prescription
    })

    return prescriptionsMap
  } catch (error) {
    console.error('Erro ao buscar prescrições por consultas:', error)
    throw error
  }
} 