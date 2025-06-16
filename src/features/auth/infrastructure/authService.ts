import { auth } from '../../../shared/services/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export async function registerWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
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
