interface Appointment {
  id: string
  patientName: string
  time: string
  type: 'presencial' | 'remota'
  status: 'agendada' | 'em-andamento' | 'concluida' | 'cancelada'
  phone?: string
  meetingCode?: string
}

interface StartConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
  onConfirm: () => void
}

export function StartConsultationModal({ isOpen, onClose, appointment, onConfirm }: StartConsultationModalProps) {
  if (!isOpen || !appointment) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#26348A' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Iniciar Consulta
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

        <div className="p-6">
          <div className="text-center mb-6">
            {appointment.type === 'remota' ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#26348A20' }}>
                  <svg className="w-8 h-8" style={{ color: '#26348A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Iniciar Consulta Remota
                </h3>
                <p className="text-gray-600 mb-4">
                  Você será direcionado para a sala virtual da consulta com:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">Horário: {appointment.time}</p>
                  <p className="text-sm text-gray-600 font-mono bg-white px-2 py-1 rounded mt-2">
                    Código: {appointment.meetingCode}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#26348A20' }}>
                  <svg className="w-8 h-8" style={{ color: '#26348A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Iniciar Consulta Presencial
                </h3>
                <p className="text-gray-600 mb-4">
                  Confirme o início da consulta presencial com:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">Horário: {appointment.time}</p>
                  <p className="text-sm text-gray-600">Telefone: {appointment.phone}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
            style={{ backgroundColor: '#26348A' }}
          >
            {appointment.type === 'remota' ? 'Entrar na Sala' : 'Iniciar Consulta'}
          </button>
        </div>
      </div>
    </div>
  )
} 