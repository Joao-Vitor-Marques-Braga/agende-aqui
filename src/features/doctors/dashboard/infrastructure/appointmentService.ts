import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../shared/services/firebase'

export async function getAppointmentsByDoctorId(doctorId: string) {
  const q = query(
    collection(db, 'appointments'),
    where('doctorId', '==', doctorId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
