import type { Appointment } from '../../dashboard/infrastructure/appointmentService'

interface SelectCompletedAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointments: Appointment[]
  loading: boolean
  error: string | null
  onSelectAppointment: (appointment: Appointment) => void
}

export function SelectCompletedAppointmentModal({ 
  isOpen, 
  onClose, 
  appointments, 
  loading, 
  error, 
  onSelectAppointment 
}: SelectCompletedAppointmentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#26348A' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Selecionar Consulta Concluída
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

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <div className="text-gray-500 text-lg mt-4">
                Carregando consultas concluídas...
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 text-lg mb-4">
                {error}
              </div>
              <p className="text-gray-500">
                Não foi possível carregar as consultas concluídas
              </p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                Nenhuma consulta concluída encontrada
              </div>
              <p className="text-gray-400">
                Você precisa ter consultas com status "Concluída" para emitir prescrições
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Selecione uma consulta concluída para emitir a prescrição:
              </p>
              
              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => onSelectAppointment(appointment)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {appointment.patientName || 'Nome não disponível'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Data:</span> {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div>
                            <span className="font-medium">Horário:</span> {appointment.time}
                          </div>
                          <div>
                            <span className="font-medium">Tipo:</span> {appointment.type === 'remota' ? 'Remota' : 'Presencial'}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-colors"
                          style={{ backgroundColor: '#26348A' }}
                        >
                          Selecionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
} 