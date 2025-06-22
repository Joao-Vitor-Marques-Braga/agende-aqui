import { useState, useEffect, useCallback } from 'react'
import { auth } from '@/shared/services/firebase'
import { DoctorScheduleService, type DaySchedule } from '../../infrastructure/doctorScheduleService'

export function useDoctorSchedule() {
  const [schedules, setSchedules] = useState<DaySchedule[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSchedules = useCallback(async () => {
    if (!auth.currentUser?.uid) return

    setLoading(true)
    setError(null)
    
    try {
      const doctorSchedule = await DoctorScheduleService.getDoctorSchedule(auth.currentUser.uid)
      
      if (doctorSchedule) {
        setSchedules(doctorSchedule.schedules)
      } else {
        const defaultSchedules = DoctorScheduleService.getDefaultSchedules()
        setSchedules(defaultSchedules)
      }
    } catch (err) {
      console.error('Erro ao carregar horários:', err)
      setError('Erro ao carregar horários')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveSchedules = useCallback(async (schedulesToSave: DaySchedule[]) => {
    if (!auth.currentUser?.uid) return

    setSaving(true)
    setError(null)
    
    try {
      await DoctorScheduleService.saveDoctorSchedule(auth.currentUser.uid, schedulesToSave)
      setSchedules(schedulesToSave)
    } catch (err) {
      console.error('Erro ao salvar horários:', err)
      setError('Erro ao salvar horários')
      throw err
    } finally {
      setSaving(false)
    }
  }, [])

  const updateSchedule = useCallback((day: string, time: string, isAvailable: boolean) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.day === day 
          ? {
              ...schedule,
              timeSlots: schedule.timeSlots.map(slot => 
                slot.time === time 
                  ? { ...slot, isAvailable }
                  : slot
              )
            }
          : schedule
      )
    )
  }, [])

  const updateDaySchedule = useCallback((day: string, isAvailable: boolean) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.day === day 
          ? {
              ...schedule,
              timeSlots: schedule.timeSlots.map(slot => ({
                ...slot,
                isAvailable
              }))
            }
          : schedule
      )
    )
  }, [])

  const getScheduleForDay = useCallback((day: string) => {
    return schedules.find(s => s.day === day) || {
      day,
      timeSlots: DoctorScheduleService.getDefaultSchedules()
        .find(s => s.day === day)?.timeSlots || []
    }
  }, [schedules])

  const getAvailableSlotsCount = useCallback((day: string) => {
    const schedule = getScheduleForDay(day)
    return schedule.timeSlots.filter(slot => slot.isAvailable).length
  }, [getScheduleForDay])

  return {
    schedules,
    loading,
    saving,
    error,
    loadSchedules,
    saveSchedules,
    updateSchedule,
    updateDaySchedule,
    getScheduleForDay,
    getAvailableSlotsCount
  }
} 