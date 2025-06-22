import { useState } from 'react'
import { DoctorHeader } from '../components/DoctorHeader'
import { NewPrescriptionModal, PrescriptionDetailsModal } from '../components'
import { useCompletedAppointments, type AppointmentWithPrescription } from '../../prescriptions/application/hooks/useCompletedAppointments'
import type { Prescription } from '../../prescriptions/infrastructure/prescriptionService'

export function DoctorPrescriptionsPage() {
  const { appointments, loading, error, refreshAppointments } = useCompletedAppointments()
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithPrescription | null>(null)
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] = useState(false)
  const [showPrescriptionDetailsModal, setShowPrescriptionDetailsModal] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)

  const handleSelectAppointment = (appointment: AppointmentWithPrescription) => {
    setSelectedAppointment(appointment)
    
    if (appointment.prescription) {
      // Se já existe prescrição, mostrar detalhes
      setSelectedPrescription(appointment.prescription)
      setShowPrescriptionDetailsModal(true)
    } else {
      // Se não existe prescrição, abrir modal para criar nova
      setShowNewPrescriptionModal(true)
    }
  }

  const handleCloseNewPrescriptionModal = () => {
    setShowNewPrescriptionModal(false)
    setSelectedAppointment(null)
  }

  const handleClosePrescriptionDetailsModal = () => {
    setShowPrescriptionDetailsModal(false)
    setSelectedPrescription(null)
  }

  const handlePrescriptionCreated = () => {
    setShowNewPrescriptionModal(false)
    setSelectedAppointment(null)
    refreshAppointments()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DoctorHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#26348A' }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DoctorHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciar Receitas
          </h1>
          <p className="text-gray-600">
            Visualize e emita receitas para consultas concluídas
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#E3F2FD' }}>
                <svg className="w-6 h-6" style={{ color: '#26348A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Consultas</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#E8F5E8' }}>
                <svg className="w-6 h-6" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receitas Emitidas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(app => app.prescription).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#FFF3E0' }}>
                <svg className="w-6 h-6" style={{ color: '#F57C00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(app => !app.prescription).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Consultas */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Consultas Concluídas
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Clique em uma consulta para emitir ou visualizar a receita
            </p>
          </div>

          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma consulta concluída</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Não há consultas concluídas para emitir receitas.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {appointment.patientName}
                          </h4>
                          {appointment.prescription && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Receita Emitida
                            </span>
                          )}
                        </div>
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
                        {appointment.prescription && (
                          <div className="mt-2 text-sm text-gray-500">
                            <span className="font-medium">Receita emitida em:</span> {new Date(appointment.prescription.issueDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <button
                          className={`px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-colors ${
                            appointment.prescription 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                          style={appointment.prescription ? {} : { backgroundColor: '#26348A' }}
                        >
                          {appointment.prescription ? 'Ver Receita' : 'Emitir Receita'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      <NewPrescriptionModal
        isOpen={showNewPrescriptionModal}
        onClose={handleCloseNewPrescriptionModal}
        selectedAppointment={selectedAppointment}
        onPrescriptionCreated={handlePrescriptionCreated}
      />

      <PrescriptionDetailsModal
        isOpen={showPrescriptionDetailsModal}
        onClose={handleClosePrescriptionDetailsModal}
        prescription={selectedPrescription}
      />
    </div>
  )
} 