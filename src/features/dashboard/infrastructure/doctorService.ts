import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../shared/services/firebase'

export async function fetchAvailableDoctors() {
  const q = query(collection(db, 'users'), where('role', '==', 'medico'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}