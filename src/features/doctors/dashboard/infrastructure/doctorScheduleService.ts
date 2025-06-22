import { db } from '@/shared/services/firebase'
import {
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
  type DocumentReference
} from 'firebase/firestore'

export interface TimeSlot {
  time: string
  isAvailable: boolean
}

export interface DaySchedule {
  day: string
  timeSlots: TimeSlot[]
}

export interface DoctorSchedule {
  schedules: DaySchedule[]
}

async function getDoctorDocRefByUid(
  uid: string
): Promise<DocumentReference | null> {
  const doctorsRef = collection(db, 'doctors')
  const q = query(doctorsRef, where('uid', '==', uid))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    console.warn(`Doctor document with uid "${uid}" not found.`)
    return null
  }

  return querySnapshot.docs[0].ref
}

export class DoctorScheduleService {
  static async getDoctorSchedule(
    doctorId: string
  ): Promise<DoctorSchedule | null> {
    try {
      const doctorDocRef = await getDoctorDocRefByUid(doctorId)

      if (!doctorDocRef) {
        return null
      }

      const doctorDoc = await getDoc(doctorDocRef)

      if (doctorDoc.exists() && doctorDoc.data().schedules) {
        return { schedules: doctorDoc.data().schedules }
      }

      return null
    } catch (error) {
      console.error('Erro ao buscar horários do médico:', error)
      throw error
    }
  }

  static async saveDoctorSchedule(
    doctorId: string,
    schedules: DaySchedule[]
  ): Promise<void> {
    try {
      const doctorDocRef = await getDoctorDocRefByUid(doctorId)
      if (!doctorDocRef) {
        throw new Error(`Doctor document for UID ${doctorId} not found.`)
      }

      await setDoc(doctorDocRef, { schedules }, { merge: true })
    } catch (error) {
      console.error('Erro ao salvar horários do médico:', error)
      throw error
    }
  }

  static getDefaultSchedules(): DaySchedule[] {
    const DAYS_OF_WEEK = [
      { value: 'monday', label: 'Segunda-feira' },
      { value: 'tuesday', label: 'Terça-feira' },
      { value: 'wednesday', label: 'Quarta-feira' },
      { value: 'thursday', label: 'Quinta-feira' },
      { value: 'friday', label: 'Sexta-feira' },
      { value: 'saturday', label: 'Sábado' },
      { value: 'sunday', label: 'Domingo' }
    ]

    const TIME_SLOTS = [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00'
    ]

    return DAYS_OF_WEEK.map(day => ({
      day: day.value,
      timeSlots: TIME_SLOTS.map(time => ({
        time,
        isAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day.value)
      }))
    }))
  }
} 