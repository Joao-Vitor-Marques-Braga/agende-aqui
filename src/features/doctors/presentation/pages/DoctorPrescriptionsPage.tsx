import { useState } from 'react'
import { DoctorHeader, NewPrescriptionModal, SuccessModal } from '../components'
import { PrescriptionsTable } from '../../../documents/presentation/components'

interface PrescriptionData {
  patientName: string
  patientCPF: string
  medications: string
  dosage: string
  instructions: string
  duration: string
  observations?: string
}

interface Prescription {
  id: string
  issueDate: string
  doctor: string
  fileName: string
  patientName: string
}

const mockDoctorPrescriptions: Prescription[] = [
  {
    id: '1',
    issueDate: '15/01/2025',
    doctor: 'Dr. Carlos Mendes',
    fileName: 'receita_maria_silva.pdf',
    patientName: 'Maria Silva Santos'
  },
  {
    id: '2',
    issueDate: '14/01/2025',
    doctor: 'Dr. Carlos Mendes',
    fileName: 'receita_joao_oliveira.pdf',
    patientName: 'João Carlos Oliveira'
  },
  {
    id: '3',
    issueDate: '10/01/2025',
    doctor: 'Dr. Carlos Mendes',
    fileName: 'receita_ana_costa.pdf',
    patientName: 'Ana Paula Costa'
  }
]

export function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockDoctorPrescriptions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [lastPatientName, setLastPatientName] = useState('')

  const handleNewPrescription = (prescriptionData: PrescriptionData) => {
    const newPrescription: Prescription = {
      id: (prescriptions.length + 1).toString(),
      issueDate: new Date().toLocaleDateString('pt-BR'),
      doctor: 'Dr. Carlos Mendes',
      fileName: `receita_${prescriptionData.patientName.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      patientName: prescriptionData.patientName
    }

    setPrescriptions(prev => [newPrescription, ...prev])
    setLastPatientName(prescriptionData.patientName)
    setIsSuccessModalOpen(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <DoctorHeader />
      
      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[80vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Receitas Emitidas
                </h1>
                <p className="text-gray-600 mb-8">
                  Gerencie as receitas que você emitiu para seus pacientes
                </p>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#26348A' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  EMITIR NOVA RECEITA
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>
                    {prescriptions.length}
                  </div>
                  <div className="text-gray-600">Total de Receitas</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {prescriptions.filter(p => {
                      const today = new Date()
                      const issueDate = new Date(p.issueDate.split('/').reverse().join('-'))
                      return issueDate.toDateString() === today.toDateString()
                    }).length}
                  </div>
                  <div className="text-gray-600">Emitidas Hoje</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {new Set(prescriptions.map(p => p.patientName)).size}
                  </div>
                  <div className="text-gray-600">Pacientes Atendidos</div>
                </div>
              </div>

              <PrescriptionsTable prescriptions={prescriptions} />
            </div>
          </div>
        </div>
      </div>

      <NewPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPrescription}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Receita Emitida com Sucesso!"
        message={`A receita para ${lastPatientName} foi emitida e estará disponível para download em instantes.`}
        icon="prescription"
      />
    </div>
  )
} 