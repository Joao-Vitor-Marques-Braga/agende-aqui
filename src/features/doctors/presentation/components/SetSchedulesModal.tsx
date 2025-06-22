import { useEffect } from 'react'
import { Modal } from '@/shared/components'
import { Button } from '@/shared/components'
import { useDoctorSchedule } from '../../dashboard/application/hooks/useDoctorSchedule'

interface SetSchedulesModalProps {
  isOpen: boolean
  onClose: () => void
}

const DAYS_OF_WEEK = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terça-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' }
]

export function SetSchedulesModal({ isOpen, onClose }: SetSchedulesModalProps) {
  const {
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
  } = useDoctorSchedule()

  useEffect(() => {
    if (isOpen && schedules.length === 0 && !loading) {
      loadSchedules()
    }
  }, [isOpen])

  const handleTimeSlotToggle = (day: string, time: string) => {
    const schedule = getScheduleForDay(day)
    const currentSlot = schedule.timeSlots.find(slot => slot.time === time)
    if (currentSlot) {
      updateSchedule(day, time, !currentSlot.isAvailable)
    }
  }

  const handleDayToggle = (day: string, isAvailable: boolean) => {
    updateDaySchedule(day, isAvailable)
  }

  const handleSave = async () => {
    try {
      await saveSchedules(schedules)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar horários:', error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Definir Horários de Atendimento"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Carregando horários...</div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {DAYS_OF_WEEK.map(({ value, label }) => {
                const schedule = getScheduleForDay(value)
                const availableCount = getAvailableSlotsCount(value)
                const allSelected = schedule.timeSlots.every(slot => slot.isAvailable)
                const noneSelected = schedule.timeSlots.every(slot => !slot.isAvailable)
                
                return (
                  <div key={value} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          ref={(input) => {
                            if (input) {
                              input.indeterminate = !allSelected && !noneSelected
                            }
                          }}
                          onChange={(e) => handleDayToggle(value, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="font-medium text-gray-700">{label}</span>
                        {availableCount > 0 && (
                          <span className="text-sm text-gray-500">
                            ({availableCount} horários)
                          </span>
                        )}
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {schedule.timeSlots.map((slot) => (
                        <label key={slot.time} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={slot.isAvailable}
                            onChange={() => handleTimeSlotToggle(value, slot.time)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{slot.time}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                onClick={onClose}
                variant="secondary"
                className="px-4 py-2"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2"
                style={{ backgroundColor: '#26348A' }}
              >
                {saving ? 'Salvando...' : 'Salvar Horários'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
