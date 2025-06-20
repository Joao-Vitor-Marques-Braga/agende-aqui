import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../../../shared/services/firebase'
import { getAppointmentsByDoctorId } from '../../infrastructure/appointmentService'

export function useDoctorAppointments() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getAppointmentsByDoctorId(user.uid)
        setAppointments(data)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { appointments, loading }
}
