import type { Appointment } from '../../dashboard/infrastructure/appointmentService'

interface AppointmentCardProps {
  appointment: Appointment
  onStartConsultation: (appointment: Appointment) => void
  onViewDetails: (appointment: Appointment) => void
}

export function AppointmentCard({ appointment, onStartConsultation, onViewDetails }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800'
      case 'em-andamento': return 'bg-green-100 text-green-800'
      case 'concluida': return 'bg-gray-100 text-gray-800'
      case 'cancelada': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    if (type === 'remota') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4" />
      </svg>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {appointment.patientName}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{appointment.time}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            {getTypeIcon(appointment.type)}
            <span className="text-sm ml-1 capitalize">{appointment.type}</span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      {appointment.meetingCode && appointment.type === 'remota' && (
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Código da Reunião:</span> {appointment.meetingCode}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={() => onViewDetails(appointment)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Ver Detalhes
        </button>
        
        {appointment.status === 'agendada' && (
          <button
            onClick={() => onStartConsultation(appointment)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#26348A' }}
          >
            Iniciar Consulta
          </button>
        )}
      </div>
    </div>
  )
} 