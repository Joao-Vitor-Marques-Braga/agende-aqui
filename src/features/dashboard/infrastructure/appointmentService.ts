import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../shared/services/firebase'

export async function saveAppointment(data: {
  doctorId: string
  doctorName: string
  specialty: string
  patientId: string
  date: string
  time: string
}) {
  return await addDoc(collection(db, 'appointments'), {
    ...data,
    status: 'agendada',
    createdAt: new Date().toISOString()
  })
}