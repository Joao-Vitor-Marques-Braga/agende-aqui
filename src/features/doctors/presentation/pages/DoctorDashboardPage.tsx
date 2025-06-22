import { useState } from 'react'
import { DoctorHeader, AppointmentCard, AppointmentDetailsModal, StartConsultationModal } from '../components'
import { SetSchedulesModal } from '../components/SetSchedulesModal'
import { useDoctorAppointments } from '../../dashboard/application/hooks/useDoctorAppoitment'
import { auth } from '../../../../shared/services/firebase'
import { Button } from '@/shared/components'
import type { Appointment } from '../../dashboard/infrastructure/appointmentService'
import { startConsultation } from '../../dashboard/infrastructure/appointmentService'

export function DoctorDashboardPage() {
  const { allAppointments, todayAppointments, loading, error, refreshAppointments } = useDoctorAppointments()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isStartConsultationModalOpen, setIsStartConsultationModalOpen] = useState(false)
  const [isSetSchedulesModalOpen, setIsSetSchedulesModalOpen] = useState(false)
  const [showTodayOnly, setShowTodayOnly] = useState(true)
  const [isStartingConsultation, setIsStartingConsultation] = useState(false)

  const handleStartConsultation = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsStartConsultationModalOpen(true)
  }

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const handleConfirmStartConsultation = async () => {
    if (!selectedAppointment) return

    try {
      setIsStartingConsultation(true)
      await startConsultation(selectedAppointment.id)
      console.log('Consulta iniciada para:', selectedAppointment.patientName)
      
      // Atualizar a lista de consultas
      await refreshAppointments()
      
      // Fechar o modal
      setIsStartConsultationModalOpen(false)
      setSelectedAppointment(null)
    } catch (error) {
      console.error('Erro ao iniciar consulta:', error)
      alert('Erro ao iniciar consulta. Tente novamente.')
    } finally {
      setIsStartingConsultation(false)
    }
  }

  const todayDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const displayedAppointments = showTodayOnly ? todayAppointments : allAppointments

  const appointmentsByStatus = {
    agendadas: displayedAppointments.filter(a => a.status === 'agendada').length,
    emAndamento: displayedAppointments.filter(a => a.status === 'em-andamento').length,
    concluidas: displayedAppointments.filter(a => a.status === 'concluida').length,
    remotas: displayedAppointments.filter(a => a.type === 'remota').length
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
                  Olá, Dr. {auth.currentUser?.displayName}
                </h1>
                <p className="text-gray-600 text-lg capitalize">
                  {todayDate}
                </p>
              </div>

              {/* Filtros */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setShowTodayOnly(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      showTodayOnly 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Hoje ({todayAppointments.length})
                  </button>
                  <button
                    onClick={() => setShowTodayOnly(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      !showTodayOnly 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Próximas ({allAppointments.length})
                  </button>
                </div>
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

                <Button 
                  className="bg-gray-50 rounded-lg shadow p-6 text-center" 
                  style={{ backgroundColor: '#26348A' }}
                  onClick={() => setIsSetSchedulesModalOpen(true)}
                >
                  <div className="text-white">Definir horários</div>
                </Button>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <div className="text-center py-4 mb-6">
                  <div className="text-red-600 text-lg">
                    {error}
                  </div>
                  <button
                    onClick={refreshAppointments}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Lista de consultas */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <div className="text-gray-500 text-lg mt-4">
                    Carregando consultas...
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onStartConsultation={handleStartConsultation}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}

              {!loading && displayedAppointments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    {showTodayOnly 
                      ? 'Nenhuma consulta agendada para hoje'
                      : 'Nenhuma consulta futura agendada'
                    }
                  </div>
                  <p className="text-gray-400 mt-2">
                    {showTodayOnly 
                      ? 'Aproveite para revisar suas anotações ou atualizar seu perfil'
                      : 'Os pacientes podem agendar consultas através do sistema'
                    }
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
        refreshAppointments={refreshAppointments}
      />

      <StartConsultationModal
        isOpen={isStartConsultationModalOpen}
        onClose={() => setIsStartConsultationModalOpen(false)}
        appointment={selectedAppointment}
        onConfirm={handleConfirmStartConsultation}
      />

      <SetSchedulesModal
        isOpen={isSetSchedulesModalOpen}
        onClose={() => setIsSetSchedulesModalOpen(false)}
      />
    </div>
  )
} 