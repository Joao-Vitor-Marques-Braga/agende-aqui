import { useState } from 'react'
import { Modal, Button } from '../../../../shared/components'
import { createAppointment } from '../../application/useCases/createAppointment'

interface Doctor {
  id: string
  name: string
  specialty: string
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  doctor: Doctor | null
}

const mockTimeSlots: TimeSlot[] = [
  { id: '1', time: '08:00', available: true },
  { id: '2', time: '08:30', available: true },
  { id: '3', time: '09:00', available: false },
  { id: '4', time: '09:30', available: true },
  { id: '5', time: '10:00', available: true },
  { id: '6', time: '10:30', available: false },
  { id: '7', time: '11:00', available: true },
  { id: '8', time: '11:30', available: true },
  { id: '9', time: '14:00', available: true },
  { id: '10', time: '14:30', available: true },
  { id: '11', time: '15:00', available: false },
  { id: '12', time: '15:30', available: true },
  { id: '13', time: '16:00', available: true },
  { id: '14', time: '16:30', available: true },
]

export function AppointmentModal({ isOpen, onClose, doctor }: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

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
    } catch (error) {
      console.error('Erro ao agendar consulta:', error)
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
    return today.toISOString().split('T')[0]
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
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
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Agendamento confirmado!
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
              <p><strong>Médico:</strong> {doctor.name}</p>
              <p><strong>Especialidade:</strong> {doctor.specialty}</p>
              <p><strong>Data:</strong> {formatDate(selectedDate)}</p>
              <p><strong>Horário:</strong> {selectedTime}</p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
                Você recebera o link e a senha de acesso em seu email de cadastro.
            </p>
          </div>
          
          <Button
            className="w-full"
            onClick={handleConfirmationClose}
          >
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
            Data da consulta
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={getMinDate()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            style={{
              '--focus-border-color': '#26348A',
              '--focus-ring-color': '#26348A33'
            } as React.CSSProperties}
            onFocus={(e) => {
              e.target.style.borderColor = '#26348A'
              e.target.style.boxShadow = `0 0 0 3px #26348A33`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horário disponível
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {mockTimeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`
                  py-2 px-3 rounded-lg text-sm font-medium transition-colors
                  ${selectedTime === slot.time
                    ? 'text-white'
                    : slot.available
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }
                `}
                style={selectedTime === slot.time ? { backgroundColor: '#26348A' } : {}}
              >
                {slot.time}
              </button>
            ))}
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
          <Button
            className="flex-1"
            onClick={handleSchedule}
            loading={loading}
          >
            Agendar
          </Button>
        </div>
      </div>
    </Modal>
  )
} 