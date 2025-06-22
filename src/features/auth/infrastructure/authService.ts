import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../../shared/services/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export async function registerWithEmail(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, 'patients', cred.user.uid), {
    uid: cred.user.uid,
    name: name,
    email: cred.user.email,
    role: 'paciente',
    createdAt: new Date().toISOString()
  })

  return cred.user
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}
