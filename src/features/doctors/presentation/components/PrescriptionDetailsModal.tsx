import type { Prescription } from '../../prescriptions/infrastructure/prescriptionService'
import { generatePrescriptionPDF } from '../../../../shared/utils/pdfGenerator'

interface PrescriptionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  prescription: Prescription | null
}

export function PrescriptionDetailsModal({ isOpen, onClose, prescription }: PrescriptionDetailsModalProps) {
  if (!isOpen || !prescription) return null

  const handleDownload = () => {
    generatePrescriptionPDF(prescription)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#26348A' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Detalhes da Receita
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
          <div className="space-y-6">
            {/* Informações do Paciente */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Informações do Paciente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <p className="mt-1 text-sm text-gray-900">{prescription.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Emissão</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(prescription.issueDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Medicamentos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medicamentos</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{prescription.medications}</p>
              </div>
            </div>

            {/* Dosagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dosagem</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900">{prescription.dosage}</p>
              </div>
            </div>

            {/* Instruções */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instruções de Uso</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{prescription.instructions}</p>
              </div>
            </div>

            {/* Duração */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duração do Tratamento</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900">{prescription.duration}</p>
              </div>
            </div>

            {/* Observações */}
            {prescription.observations && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{prescription.observations}</p>
                </div>
              </div>
            )}

            {/* Informações do Arquivo */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Arquivo da Receita</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Nome do arquivo:</strong> {prescription.fileName}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Receita emitida pelo Dr. {prescription.doctorName}
                  </p>
                </div>
                <button
                  className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-colors flex items-center"
                  style={{ backgroundColor: '#26348A' }}
                  onClick={handleDownload}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 