import { useState } from 'react'
import { DoctorHeader, AppointmentCard, AppointmentDetailsModal, StartConsultationModal } from '../../presentation/components'
import { useDoctorAppointments } from '../application/hooks/useDoctorAppoitment'

interface Appointment {
  id: string
  patientName: string
  time: string
  type: 'presencial' | 'remota'
  status: 'agendada' | 'em-andamento' | 'concluida' | 'cancelada'
  phone?: string
  meetingCode?: string
}

export function DoctorDashboardPage() {
  const { appointments, loading } = useDoctorAppointments()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isStartConsultationModalOpen, setIsStartConsultationModalOpen] = useState(false)

  const handleStartConsultation = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsStartConsultationModalOpen(true)
  }

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const handleConfirmStartConsultation = () => {
    console.log('Consulta iniciada para:', selectedAppointment?.patientName)
  }

  const todayDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const appointmentsByStatus = {
    agendadas: appointments.filter(a => a.status === 'agendada').length,
    emAndamento: appointments.filter(a => a.status === 'em-andamento').length,
    concluidas: appointments.filter(a => a.status === 'concluida').length,
    remotas: appointments.filter(a => a.type === 'remota').length
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <DoctorHeader />

      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[80vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Consultas do Dia
                </h1>
                <p className="text-gray-600 text-lg capitalize">
                  {todayDate}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>
                    {appointmentsByStatus.agendadas}
                  </div>
                  <div className="text-gray-600">Agendadas</div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {appointmentsByStatus.emAndamento}
                  </div>
                  <div className="text-gray-600">Em Andamento</div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {appointmentsByStatus.concluidas}
                  </div>
                  <div className="text-gray-600">Concluídas</div>
                </div>

                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {appointmentsByStatus.remotas}
                  </div>
                  <div className="text-gray-600">Remotas</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">
                      Carregando consultas...
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onStartConsultation={handleStartConsultation}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>

              {appointments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    Nenhuma consulta agendada para hoje
                  </div>
                  <p className="text-gray-400 mt-2">
                    Aproveite para revisar suas anotações ou atualizar seu perfil
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
      />

      <StartConsultationModal
        isOpen={isStartConsultationModalOpen}
        onClose={() => setIsStartConsultationModalOpen(false)}
        appointment={selectedAppointment}
        onConfirm={handleConfirmStartConsultation}
      />
    </div>
  )
} 