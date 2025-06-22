import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../../../../shared/services/firebase'
import { getCompletedAppointments, getPrescriptionsByAppointments, type Prescription } from '../../infrastructure/prescriptionService'
import type { Appointment } from '../../../dashboard/infrastructure/appointmentService'
import { collection, getDocs, query, where } from 'firebase/firestore'

export interface AppointmentWithPrescription extends Appointment {
  prescription?: Prescription | null
}

export function useCompletedAppointments() {
  const [appointments, setAppointments] = useState<AppointmentWithPrescription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function getDoctorIdFromUid(uid: string): Promise<string | null> {
    const doctorsQuery = query(collection(db, 'doctors'), where('uid', '==', uid))
    const snapshot = await getDocs(doctorsQuery)
  
    if (!snapshot.empty) {
      const doctorData = snapshot.docs[0]
      console.log(doctorData.id)
      return doctorData.id || null
    }
  
    return null
  }

  const fetchAppointments = async (doctorId: string) => {
    console.log(doctorId)
    try {
      setLoading(true)
      setError(null)
      
      const data = await getCompletedAppointments(doctorId)
      
      const appointmentIds = data.map(appointment => appointment.id)
      const prescriptionsMap = await getPrescriptionsByAppointments(appointmentIds)
      
      const appointmentsWithPrescriptions: AppointmentWithPrescription[] = data.map(appointment => ({
        ...appointment,
        prescription: prescriptionsMap[appointment.id] || null
      }))
      
      setAppointments(appointmentsWithPrescriptions)
      
    } catch (err: any) {
      console.error('Erro ao buscar consultas concluídas:', err)
      setError('Erro ao carregar consultas concluídas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doctorId = await getDoctorIdFromUid(user.uid)
        if (doctorId) {
          await fetchAppointments(doctorId)
        }
      } else {
        setAppointments([])
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const refreshAppointments = async () => {
    const user = auth.currentUser
    if (user) {
      const doctorId = await getDoctorIdFromUid(user.uid)
      if (doctorId) {
        await fetchAppointments(doctorId)
      }
    }
  }

  return { 
    appointments, 
    loading, 
    error,
    refreshAppointments 
  }
} 