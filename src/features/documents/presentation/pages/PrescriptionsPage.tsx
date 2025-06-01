import { Header } from '../../../../shared/components'
import { PrescriptionsTable } from '../components'

const mockPrescriptions = [
  {
    id: '1',
    issueDate: '03/06/2025',
    doctor: 'Dra. Flavia Martins Ferreira',
    fileName: 'receita_20250603.pdf'
  },
  {
    id: '2',
    issueDate: '24/05/2025',
    doctor: 'Dr. Alessandro Pereira Cruvinel',
    fileName: 'receita_20250524.pdf'
  },
  {
    id: '3',
    issueDate: '03/12/2024',
    doctor: 'Dra. Flavia Martins Ferreira',
    fileName: 'receita_20241203.pdf'
  }
]

export function PrescriptionsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <Header />
      
      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[91.2vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                  FAÇA O DOWNLOAD PARA VISUALIZAR AS RECEITAS JÁ EMITIDAS PARA VOCÊ DE ACORDO COM O MÉDICO E/OU DATA
                </h1>
              </div>

              <PrescriptionsTable prescriptions={mockPrescriptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 