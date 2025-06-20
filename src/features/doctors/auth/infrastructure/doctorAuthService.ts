import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../../../shared/services/firebase'

export async function loginDoctorByCRM(crm: string, password: string) {
  const q = query(collection(db, 'users'), where('crm', '==', crm), where('role', '==', 'medico'))
  const result = await getDocs(q)

  if (result.empty) throw new Error('CRM não encontrado')

  const userData = result.docs[0].data()
  const email = userData.email

  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}
