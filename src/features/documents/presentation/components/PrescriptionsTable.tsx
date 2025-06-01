import { DownloadButton } from './DownloadButton'

interface Prescription {
  id: string
  issueDate: string
  doctor: string
  fileName: string
}

interface PrescriptionsTableProps {
  prescriptions: Prescription[]
}

export function PrescriptionsTable({ prescriptions }: PrescriptionsTableProps) {
  const handleDownload = (prescription: Prescription) => {
    console.log(`Downloading prescription: ${prescription.fileName}`)
    alert(`Download iniciado: ${prescription.fileName}`)
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-3 gap-4 mb-4">
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
            RESPONSÁVEL PELA EMISSÃO
          </div>
          <div 
            className="p-4 text-center font-bold text-white rounded-lg"
            style={{ backgroundColor: '#26348A' }}
          >
            ARQUIVO
          </div>
        </div>

        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="grid grid-cols-3 gap-4">
              <div 
                className="p-4 text-center font-medium text-white rounded-lg"
                style={{ backgroundColor: '#26348A' }}
              >
                {prescription.issueDate}
              </div>
              <div 
                className="p-4 text-center font-medium text-white rounded-lg"
                style={{ backgroundColor: '#26348A' }}
              >
                {prescription.doctor}
              </div>
              <div 
                className="p-4 text-center rounded-lg flex justify-center"
                style={{ backgroundColor: '#26348A' }}
              >
                <DownloadButton onDownload={() => handleDownload(prescription)} />
              </div>
            </div>
          ))}
        </div>

        {prescriptions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Nenhuma receita encontrada
            </div>
            <p className="text-gray-400 mt-2">
              As receitas emitidas pelos médicos aparecerão aqui
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 