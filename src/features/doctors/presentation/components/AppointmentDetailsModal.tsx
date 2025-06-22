import { cancelAppointment, finishConsultation, rescheduleAppointment, type Appointment } from '../../dashboard/infrastructure/appointmentService'

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
  refreshAppointments: () => void
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment, refreshAppointments }: AppointmentDetailsModalProps) {
  if (!isOpen || !appointment) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Detalhes da Consulta</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Paciente</label>
            <p className="mt-1 text-sm text-gray-900">{appointment.patientName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(appointment.date).toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Horário</label>
            <p className="mt-1 text-sm text-gray-900">{appointment.time}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <p className="mt-1 text-sm text-gray-900 capitalize">{appointment.type}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1 text-sm text-gray-900 capitalize">
              {appointment.status.replace('-', ' ')}
            </p>
          </div>



          {appointment.meetingCode && appointment.type === 'remota' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Código da Reunião</label>
              <p className="mt-1 text-sm text-gray-900">{appointment.meetingCode}</p>
            </div>
          )}

          
        </div>

        <div className="mt-6 flex justify-end">
          {appointment.status === 'agendada' && (
          <button
            onClick={() => {
              cancelAppointment(appointment.id)
              onClose()
              refreshAppointments()
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Cancelar Consulta
          </button>
          )}
          {appointment.status === 'em-andamento' && (
            <button
              onClick={() => {
                finishConsultation(appointment.id)
                onClose()
                refreshAppointments()
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            >
              Finalizar Consulta
            </button>
          )}
          {appointment.status === 'cancelada' && (
            <button
              onClick={() => {
                rescheduleAppointment(appointment.id)
                onClose()
                refreshAppointments()
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Reagendar Consulta
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
} 