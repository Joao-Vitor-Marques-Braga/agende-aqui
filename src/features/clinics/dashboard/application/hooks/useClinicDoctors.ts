import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../../../../shared/services/firebase'

export interface ClinicDoctor {
  id: string
  name: string
  crm: string
  specialty: string
  email: string
  phone: string
  clinicId: string
  clinicName: string
  status: string
  createdAt: string
}

export function useClinicDoctors() {
  const [doctors, setDoctors] = useState<ClinicDoctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log('Nenhum usuário logado')
        setDoctors([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        console.log('Buscando clínica para usuário:', user.uid)
        console.log('Email do usuário:', user.email)

        const clinicQuery = query(
          collection(db, 'clinics'),
          where('uid', '==', user.uid),
          where('role', '==', 'clinica')
        )

        const clinicSnapshot = await getDocs(clinicQuery)

        if (clinicSnapshot.empty) {
          console.log('Clínica não encontrada para UID:', user.uid)
          
          const debugQuery = query(
            collection(db, 'clinics'),
            where('uid', '==', user.uid)
          )
          const debugSnapshot = await getDocs(debugQuery)
          
          if (debugSnapshot.empty) {
            console.log('Nenhum documento encontrado para UID:', user.uid)
            setError('Clínica não encontrada. Verifique se você está logado corretamente.')
          } else {
            const debugData = debugSnapshot.docs[0].data()
            console.log('Documento encontrado mas sem role correto:', debugData)
            setError('Clínica não encontrada com perfil correto.')
          }
          setLoading(false)
          return
        }

        const clinicData = clinicSnapshot.docs[0].data()
        const clinicId = clinicSnapshot.docs[0].id

        console.log('Clínica encontrada:', clinicData.name, 'ID:', clinicId)
        console.log('Dados completos da clínica:', clinicData)

        const doctorsQuery = query(
          collection(db, 'doctors'),
          where('clinicId', '==', clinicId),
          where('role', '==', 'medico')
        )

        const doctorsSnapshot = await getDocs(doctorsQuery)

        const clinicDoctors = doctorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ClinicDoctor[]

        console.log('Médicos encontrados para clínica:', clinicDoctors.length)
        console.log('Médicos:', clinicDoctors.map(d => ({ name: d.name, crm: d.crm })))
        
        setDoctors(clinicDoctors)

      } catch (err: any) {
        console.error('Erro ao buscar médicos da clínica:', err)
        setError('Erro ao carregar médicos da clínica')
        setDoctors([])
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const refreshDoctors = async () => {
    if (auth.currentUser) {
      setLoading(true)
      setError(null)
      
      try {
        console.log('Atualizando lista de médicos...')
        
        const clinicQuery = query(
          collection(db, 'clinics'),
          where('uid', '==', auth.currentUser.uid),
          where('role', '==', 'clinica')
        )

        const clinicSnapshot = await getDocs(clinicQuery)

        if (clinicSnapshot.empty) {
          setError('Clínica não encontrada')
          return
        }

        const clinicId = clinicSnapshot.docs[0].id

        const doctorsQuery = query(
          collection(db, 'doctors'),
          where('clinicId', '==', clinicId),
          where('role', '==', 'medico')
        )

        const doctorsSnapshot = await getDocs(doctorsQuery)

        const clinicDoctors = doctorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ClinicDoctor[]

        console.log('Lista de médicos atualizada:', clinicDoctors.length)
        setDoctors(clinicDoctors)
        
      } catch (err: any) {
        console.error('Erro ao atualizar médicos:', err)
        setError('Erro ao atualizar lista de médicos')
      } finally {
        setLoading(false)
      }
    }
  }

  return { doctors, loading, error, refreshDoctors }
} 