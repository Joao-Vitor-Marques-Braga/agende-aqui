import { useState, useCallback } from 'react'
import { DoctorAvailabilityService } from '../../infrastructure/doctorAvailabilityService'

export function useDoctorAvailability() {
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAvailableSlots = useCallback(
    async (doctorId: string, date: string) => {
      if (!doctorId || !date) {
        setAvailableSlots([])
        return
      }

      setLoading(true)
      setError(null)
      setAvailableSlots([])

      try {
        const slots = await DoctorAvailabilityService.getAvailableSlots(
          doctorId,
          date
        )
        setAvailableSlots(slots)
      } catch (err) {
        console.error('Erro ao buscar horários:', err)
        setError('Não foi possível carregar os horários. Tente novamente.')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    availableSlots,
    loading,
    error,
    fetchAvailableSlots
  }
} 