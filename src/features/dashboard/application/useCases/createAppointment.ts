import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../../shared/services/firebase'
import { saveAppointment } from '../../infrastructure/appointmentService'

export async function createAppointment(data: {
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
}) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await saveAppointment({
            doctorId: data.doctorId,
            doctorName: data.doctorName,
            specialty: data.specialty,
            date: data.date,
            time: data.time,
            patientId: user.uid
          })
          resolve(response)
        } catch (error) {
          reject(error)
        }
      } else {
        reject(new Error('Usuário não autenticado'))
      }
    })
  })
}