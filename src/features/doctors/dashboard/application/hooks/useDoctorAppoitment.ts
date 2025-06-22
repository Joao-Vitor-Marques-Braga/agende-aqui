import { useState, useEffect } from 'react'
import { auth } from '@/shared/services/firebase'
import { getAppointmentsByDoctorId, getTodayAppointments, type Appointment } from '../../infrastructure/appointmentService'
import { onAuthStateChanged, type User } from 'firebase/auth'

export function useDoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = async (doctorId: string) => {
    console.log('fetchAppointments chamado com doctorId:', doctorId)
    try {
      setLoading(true)
      setError(null)

      const allAppointments = await getAppointmentsByDoctorId(doctorId)
      const today = await getTodayAppointments(doctorId)

      setAppointments(allAppointments)
      setTodayAppointments(today)
    } catch (err) {
      console.error('Erro ao buscar consultas:', err)
      setError('Erro ao carregar consultas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        await fetchAppointments(user.uid)
      } else {
        setAppointments([])
        setTodayAppointments([])
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const refreshAppointments = async () => {
    const user = auth.currentUser
    if (user) {
      await fetchAppointments(user.uid)
    }
  }

   
  return {
    allAppointments: appointments,
    todayAppointments,
    loading,
    error,
    refreshAppointments
  }
}
