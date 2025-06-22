import { db } from '@/shared/services/firebase'
import {
  getDoc,
  query,
  where,
  getDocs,
  collection,
  DocumentReference,
  doc
} from 'firebase/firestore'

interface TimeSlotFromDB {
  time: string
  isAvailable: boolean
}

interface DayScheduleFromDB {
  day: string
  timeSlots: TimeSlotFromDB[]
}

async function getDoctorDocRefById(
  doctorId: string
): Promise<DocumentReference | null> {
  const doctorRef = doc(db, 'doctors', doctorId)
  const doctorSnap = await getDoc(doctorRef)

  if (!doctorSnap.exists()) {
    console.warn(`Doctor document with id "${doctorId}" not found.`)
    return null
  }

  return doctorSnap.ref
}

export class DoctorAvailabilityService {
  static async getAvailableSlots(
    doctorId: string,
    date: string
  ): Promise<string[]> {
    try {
      const doctorDocRef = await getDoctorDocRefById(doctorId)
      if (!doctorDocRef) return []

      const doctorDoc = await getDoc(doctorDocRef)
      if (!doctorDoc.exists() || !doctorDoc.data().schedules) {
        return []
      }

      const schedules: DayScheduleFromDB[] = doctorDoc.data().schedules
      const selectedDate = new Date(date)
      const dayOfWeek = selectedDate
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase()

      const daySchedule = schedules.find(
        (s: DayScheduleFromDB) => s.day === dayOfWeek
      )
      if (!daySchedule) return []

      const availableSlots = daySchedule.timeSlots
        .filter((slot: TimeSlotFromDB) => slot.isAvailable)
        .map((slot: TimeSlotFromDB) => slot.time)

      const appointmentsRef = collection(db, 'appointments')
      const q = query(
        appointmentsRef,
        where('doctorId', '==', doctorId),
        where('date', '==', date)
      )

      const querySnapshot = await getDocs(q)
      const bookedSlots = querySnapshot.docs.map(d => d.data().time)

      return availableSlots.filter(slot => !bookedSlots.includes(slot))
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error)
      throw error
    }
  }
} 