interface Appointment {
  id: string
  patientName: string
  time: string
  type: 'presencial' | 'remota'
  status: 'agendada' | 'em-andamento' | 'concluida' | 'cancelada'
  phone?: string
  meetingCode?: string
}

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  if (!isOpen || !appointment) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'text-blue-600 bg-blue-100'
      case 'em-andamento': return 'text-green-600 bg-green-100'
      case 'concluida': return 'text-gray-600 bg-gray-100'
      case 'cancelada': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="fixed inset-0 bg-black opacity-10 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#26348A' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Detalhes da Consulta
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Paciente:</label>
            <p className="text-lg font-semibold text-gray-900">{appointment.patientName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Horário:</label>
              <p className="text-gray-900 font-medium">{appointment.time}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Tipo:</label>
              <p className="text-gray-900 font-medium capitalize">{appointment.type}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Status:</label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(appointment.status)}`}>
              {appointment.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {appointment.phone && (
            <div>
              <label className="text-sm font-medium text-gray-600">Telefone:</label>
              <p className="text-gray-900 font-medium">{appointment.phone}</p>
            </div>
          )}

          {appointment.meetingCode && appointment.type === 'remota' && (
            <div>
              <label className="text-sm font-medium text-gray-600">Código da Reunião:</label>
              <p className="text-gray-900 font-medium bg-gray-100 px-3 py-2 rounded font-mono">
                {appointment.meetingCode}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#26348A' }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
} 