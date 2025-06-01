import { useState } from 'react'
import { Input, Button } from '../../../../shared/components'

interface NewPrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (prescription: PrescriptionData) => void
}

interface PrescriptionData {
  patientName: string
  patientCPF: string
  medications: string
  dosage: string
  instructions: string
  duration: string
  observations?: string
}

export function NewPrescriptionModal({ isOpen, onClose, onSubmit }: NewPrescriptionModalProps) {
  const [formData, setFormData] = useState<PrescriptionData>({
    patientName: '',
    patientCPF: '',
    medications: '',
    dosage: '',
    instructions: '',
    duration: '',
    observations: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.patientName || !formData.patientCPF || !formData.medications || !formData.dosage) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsSubmitting(true)
    
    setTimeout(() => {
      onSubmit(formData)
      setIsSubmitting(false)
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setFormData({
      patientName: '',
      patientCPF: '',
      medications: '',
      dosage: '',
      instructions: '',
      duration: '',
      observations: ''
    })
    onClose()
  }

  const handleInputChange = (field: keyof PrescriptionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-5 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#26348A' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Emitir Nova Receita
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome do Paciente *"
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              placeholder="Nome completo do paciente"
              disabled={isSubmitting}
            />

            <Input
              label="CPF do Paciente *"
              value={formData.patientCPF}
              onChange={(e) => handleInputChange('patientCPF', e.target.value)}
              placeholder="000.000.000-00"
              disabled={isSubmitting}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicamentos *
            </label>
            <textarea
              value={formData.medications}
              onChange={(e) => handleInputChange('medications', e.target.value)}
              placeholder="Liste os medicamentos prescritos"
              rows={3}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200 placeholder:text-gray-400"
            />
          </div>

          <div className="mt-6">
            <Input
              label="Dosagem *"
              value={formData.dosage}
              onChange={(e) => handleInputChange('dosage', e.target.value)}
              placeholder="Ex: 1 comprimido de 8/8 horas"
              disabled={isSubmitting}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruções de Uso
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              placeholder="Instruções específicas para o paciente"
              rows={3}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200 placeholder:text-gray-400"
            />
          </div>

          <div className="mt-6">
            <Input
              label="Duração do Tratamento"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="Ex: 7 dias, 2 semanas"
              disabled={isSubmitting}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              placeholder="Observações adicionais"
              rows={2}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200 placeholder:text-gray-400"
            />
          </div>

          <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 text-lg font-medium"
            >
              {isSubmitting ? 'Emitindo...' : 'Emitir Receita'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 