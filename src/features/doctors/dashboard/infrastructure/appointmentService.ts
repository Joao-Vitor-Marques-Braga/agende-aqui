import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../../../../shared/services/firebase'

export interface Appointment {
  id: string
  patientName: string
  patientId: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  type: 'presencial' | 'remota'
  status: 'agendada' | 'em-andamento' | 'concluida' | 'cancelada'
  meetingCode?: string
  createdAt: string
}

export async function getPatientNameFromUid(uid: string): Promise<string | null> {
  const patientsQuery = query(collection(db, 'patients'), where('uid', '==', uid))
  const snapshot = await getDocs(patientsQuery)
  if (!snapshot.empty) {
    const patientData = snapshot.docs[0]
    console.log('patientId', patientData.id)
    return patientData.data().name || null
  }
  return null
}

export async function getDoctorIdFromUid(uid: string): Promise<string | null> {
  const doctorsQuery = query(collection(db, 'doctors'), where('uid', '==', uid))
  const snapshot = await getDocs(doctorsQuery)

  if (!snapshot.empty) {
    const doctorData = snapshot.docs[0]
    console.log('doctorId', doctorData.id)
    return doctorData.id || null
  }

  return null
}

export async function getAppointmentsByDoctorId(uid: string): Promise<Appointment[]> {
  const doctorId = await getDoctorIdFromUid(uid)
  const patientName = await getPatientNameFromUid(uid)
  console.log('patientName', patientName)

  if (!doctorId) {
    console.warn('Médico não encontrado para o UID fornecido.')
    return []
  }

  try {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      orderBy('date', 'asc'),
      orderBy('time', 'asc')
    )

    const snapshot = await getDocs(q)

    const appointments = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data()
        const patientName = await getPatientNameFromUid(data.patientId)
        return {
          id: doc.id,
          ...data,
          patientName: patientName || 'Paciente não identificado'
        }
      })
    )

    return appointments as Appointment[]
  } catch (error) {
    console.error('Erro ao buscar consultas do médico:', error)
    return []
  }
}

export async function getTodayAppointments(doctorId: string): Promise<Appointment[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('date', '==', today),
      orderBy('time', 'asc')
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
            collection(db, 'patients'),
            where('uid', '==', appointment.patientId)
          )
          const patientSnapshot = await getDocs(patientQuery)

          if (!patientSnapshot.empty) {
            const patientData = patientSnapshot.docs[0].data()
            return {
              ...appointment,
              patientName: patientData.name || 'Paciente não identificado',
            }
          }

          return {
            ...appointment,
            patientName: appointment.patientName || 'Paciente não identificado',
          }
        } catch (error) {
          console.error('Erro ao buscar dados do paciente:', error)
          return {
            ...appointment,
            patientName: appointment.patientName || 'Paciente não identificado',
          }
        }
      })
    )

    return appointmentsWithPatientInfo
  } catch (error) {
    console.error('Erro ao buscar consultas de hoje:', error)
    throw error
  }
}

export async function updateAppointmentStatus(appointmentId: string, status: Appointment['status']): Promise<void> {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Erro ao atualizar status da consulta:', error)
    throw error
  }
}

export async function startConsultation(appointmentId: string): Promise<void> {
  return updateAppointmentStatus(appointmentId, 'em-andamento')
}

export async function finishConsultation(appointmentId: string): Promise<void> {
  return updateAppointmentStatus(appointmentId, 'concluida')
}

export async function rescheduleAppointment(appointmentId: string): Promise<void> {
  return updateAppointmentStatus(appointmentId, 'agendada')
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
  return updateAppointmentStatus(appointmentId, 'cancelada')
}
