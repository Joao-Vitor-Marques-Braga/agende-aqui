import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, type Firestore } from 'firebase/firestore'
import { auth, db } from '../../../../../shared/services/firebase'
import { doctorRegisterSchema } from '../../domain/validations/doctorRegisterValidation'

export async function registerDoctorUser(data: {
  name: string
  crm: string
  specialty: string
  email: string
  password: string
}) {
  await doctorRegisterSchema.validate(data)

  const cred = await createUserWithEmailAndPassword(auth, data.email, data.password)

  await addDoc(collection(db, 'users'), {
    uid: cred.user.uid,
    name: data.name,
    crm: data.crm,
    specialty: data.specialty,
    email: data.email,
    role: 'medico'
  })

  return cred.user
}
