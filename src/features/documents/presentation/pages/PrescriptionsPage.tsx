import { Header } from '../../../../shared/components'
import { PrescriptionsTable } from '../components'
import { usePatientPrescriptions } from '../../application/hooks/usePatientPrescriptions'

export function PrescriptionsPage() {
  const { prescriptions, loading, error, refreshPrescriptions } = usePatientPrescriptions()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <Header />
      
      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[91.2vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                  SUAS RECEITAS MÉDICAS
                </h1>
                <p className="text-gray-600 mb-8">
                  Visualize e faça download das receitas emitidas pelos médicos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>
                    {loading ? '...' : prescriptions.length}
                  </div>
                  <div className="text-gray-600">Total de Receitas</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {loading ? '...' : prescriptions.filter(p => {
                      const issueDate = new Date(p.issueDate)
                      const thirtyDaysAgo = new Date()
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                      return issueDate > thirtyDaysAgo
                    }).length}
                  </div>
                  <div className="text-gray-600">Últimos 30 dias</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {loading ? '...' : new Set(prescriptions.map(p => p.doctorName)).size}
                  </div>
                  <div className="text-gray-600">Médicos Diferentes</div>
                </div>
              </div>

              {error && (
                <div className="text-center py-4 mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-600 text-lg">
                      {error}
                    </div>
                    <button
                      onClick={refreshPrescriptions}
                      className="mt-2 text-blue-600 hover:underline"
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              )}

              <PrescriptionsTable prescriptions={prescriptions} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 