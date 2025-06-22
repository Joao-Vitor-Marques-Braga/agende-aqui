import { useState, useEffect } from 'react'
import { Modal, Button } from '../../../../shared/components'
import { createAppointment } from '../../application/useCases/createAppointment'
import { useDoctorAvailability } from '../../application/hooks/useDoctorAvailability'

interface Doctor {
  id: string
  name: string
  specialty: string
}

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  doctor: Doctor | null
}

export function AppointmentModal({
  isOpen,
  onClose,
  doctor
}: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const {
    availableSlots,
    loading: slotsLoading,
    error: slotsError,
    fetchAvailableSlots
  } = useDoctorAvailability()

  useEffect(() => {
    if (doctor?.id && selectedDate) {
      fetchAvailableSlots(doctor.id, selectedDate)
      setSelectedTime('') // Reset selected time when date changes
    }
  }, [doctor, selectedDate, fetchAvailableSlots])

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !doctor) {
      alert('Por favor, selecione data e horário')
      return
    }

    setLoading(true)

    try {
      await createAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: selectedDate,
        time: selectedTime
      })
      setShowConfirmation(true)
    } catch (error) {
      console.error('Erro ao agendar consulta:', error)
      alert(
        'Ocorreu um erro ao agendar sua consulta. Tente novamente mais tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    onClose()
    setSelectedDate('')
    setSelectedTime('')
  }

  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1) // Start from tomorrow
    return today.toISOString().split('T')[0]
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString(
      'pt-BR'
    )
  }

  if (!doctor) return null

  if (showConfirmation) {
    return (
      <Modal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        title="Consulta Agendada!"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-green-100">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Agendamento confirmado!
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
              <p>
                <strong>Médico:</strong> {doctor.name}
              </p>
              <p>
                <strong>Especialidade:</strong> {doctor.specialty}
              </p>
              <p>
                <strong>Data:</strong> {formatDate(selectedDate)}
              </p>
              <p>
                <strong>Horário:</strong> {selectedTime}
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Você recebera o link e a senha de acesso em seu email de cadastro.
            </p>
          </div>

          <Button className="w-full" onClick={handleConfirmationClose}>
            OK
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Agendar consulta com ${doctor.name}`}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
          <p className="text-gray-600">{doctor.specialty}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escolha o dia da consulta
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            min={getMinDate()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            style={
              {
                '--focus-border-color': '#26348A',
                '--focus-ring-color': '#26348A33'
              } as React.CSSProperties
            }
            onFocus={e => {
              e.target.style.borderColor = '#26348A'
              e.target.style.boxShadow = `0 0 0 3px #26348A33`
            }}
            onBlur={e => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horários disponíveis
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 border rounded-lg">
            {slotsLoading && (
              <p className="text-gray-500 col-span-3 text-center py-4">
                Carregando horários...
              </p>
            )}
            {slotsError && (
              <p className="text-red-500 col-span-3 text-center py-4">
                {slotsError}
              </p>
            )}
            {!slotsLoading && !slotsError && availableSlots.length > 0 &&
              availableSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                  py-2 px-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    selectedTime === time
                      ? 'text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }
                `}
                  style={
                    selectedTime === time ? { backgroundColor: '#26348A' } : {}
                  }
                >
                  {time}
                </button>
              ))}
            {!slotsLoading && !slotsError && availableSlots.length === 0 && selectedDate && (
              <p className="text-gray-500 col-span-3 text-center py-4">
                Não há horários disponíveis para esta data.
              </p>
            )}
            {!slotsLoading && !slotsError && availableSlots.length === 0 && !selectedDate && (
              <p className="text-gray-500 col-span-3 text-center py-4">
                Selecione uma data para ver os horários.
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button className="flex-1" onClick={handleSchedule} loading={loading}>
            Agendar
          </Button>
        </div>
      </div>
    </Modal>
  )
} 