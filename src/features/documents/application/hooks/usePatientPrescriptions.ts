import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../../shared/services/firebase'
import { getPatientPrescriptions, getPatientIdFromUid, type PatientPrescription } from '../../infrastructure/patientPrescriptionService'

export function usePatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<PatientPrescription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrescriptions = async (uid: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const patientId = await getPatientIdFromUid(uid)
      
      if (!patientId) {
        setError('Paciente não encontrado')
        setPrescriptions([])
        return
      }
      
      const data = await getPatientPrescriptions(patientId)
      setPrescriptions(data)
      
    } catch (err: any) {
      console.error('Erro ao buscar prescrições do paciente:', err)
      setError('Erro ao carregar prescrições. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchPrescriptions(user.uid)
      } else {
        setPrescriptions([])
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const refreshPrescriptions = async () => {
    const user = auth.currentUser
    if (user) {
      await fetchPrescriptions(user.uid)
    }
  }

  return { 
    prescriptions, 
    loading, 
    error,
    refreshPrescriptions 
  }
} 