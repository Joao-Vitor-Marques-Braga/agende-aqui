import { useState } from 'react'
import { DownloadButton } from './DownloadButton'
import { PatientPrescriptionDetailsModal } from './PatientPrescriptionDetailsModal'
import type { PatientPrescription } from '../../infrastructure/patientPrescriptionService'

interface PrescriptionsTableProps {
  prescriptions: PatientPrescription[]
  loading?: boolean
}

export function PrescriptionsTable({ prescriptions, loading = false }: PrescriptionsTableProps) {
  const [selectedPrescription, setSelectedPrescription] = useState<PatientPrescription | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handleViewDetails = (prescription: PatientPrescription) => {
    setSelectedPrescription(prescription)
    setShowDetailsModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailsModal(false)
    setSelectedPrescription(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#26348A' }}></div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div 
            className="p-4 text-center font-bold text-white rounded-lg"
            style={{ backgroundColor: '#26348A' }}
          >
            DATA DE EMISSÃO
          </div>
          <div 
            className="p-4 text-center font-bold text-white rounded-lg"
            style={{ backgroundColor: '#26348A' }}
          >
            MÉDICO
          </div>
          <div 
            className="p-4 text-center font-bold text-white rounded-lg"
            style={{ backgroundColor: '#26348A' }}
          >
            MEDICAMENTOS
          </div>
          <div 
            className="p-4 text-center font-bold text-white rounded-lg"
            style={{ backgroundColor: '#26348A' }}
          >
            AÇÕES
          </div>
        </div>

        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="grid grid-cols-4 gap-4">
              <div 
                className="p-4 text-center font-medium text-white rounded-lg"
                style={{ backgroundColor: '#26348A' }}
              >
                {new Date(prescription.issueDate).toLocaleDateString('pt-BR')}
              </div>
              <div 
                className="p-4 text-center font-medium text-white rounded-lg"
                style={{ backgroundColor: '#26348A' }}
              >
                {prescription.doctorName}
              </div>
              <div 
                className="p-4 text-center font-medium text-white rounded-lg"
                style={{ backgroundColor: '#26348A' }}
              >
                <div className="truncate" title={prescription.medications}>
                  {prescription.medications.split('\n')[0]}
                  {prescription.medications.split('\n').length > 1 && '...'}
                </div>
              </div>
              <div 
                className="p-4 text-center rounded-lg flex justify-center space-x-2"
                style={{ backgroundColor: '#26348A' }}
              >
                <button
                  onClick={() => handleViewDetails(prescription)}
                  className="bg-blue-100 inline-flex items-center px-3 py-2 rounded-lg font-medium text-black transition-colors hover:opacity-90"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver
                </button>
                <DownloadButton onDownload={() => handleViewDetails(prescription)} />
              </div>
            </div>
          ))}
        </div>

        {prescriptions.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma receita encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              As receitas emitidas pelos médicos aparecerão aqui quando disponíveis.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      <PatientPrescriptionDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        prescription={selectedPrescription}
      />
    </div>
  )
} 