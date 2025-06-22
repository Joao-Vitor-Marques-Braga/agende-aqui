import type { Appointment } from '../../dashboard/infrastructure/appointmentService'

interface StartConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
  onConfirm: () => void
}

export function StartConsultationModal({ isOpen, onClose, appointment, onConfirm }: StartConsultationModalProps) {
  if (!isOpen || !appointment) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Iniciar Consulta
          </h3>
          
          <p className="text-sm text-gray-500 mb-6">
            Você está prestes a iniciar a consulta com <strong>{appointment.patientName}</strong>.
            Esta ação irá alterar o status da consulta para "Em Andamento".
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="text-sm text-gray-600">
              <div className="mb-2">
                <span className="font-medium">Paciente:</span> {appointment.patientName}
              </div>
              <div className="mb-2">
                <span className="font-medium">Data:</span> {new Date(appointment.date).toLocaleDateString('pt-BR')}
              </div>
              <div className="mb-2">
                <span className="font-medium">Horário:</span> {appointment.time}
              </div>
              <div>
                <span className="font-medium">Tipo:</span> {appointment.type === 'remota' ? 'Consulta Remota' : 'Consulta Presencial'}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#26348A' }}
            >
              Iniciar Consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 