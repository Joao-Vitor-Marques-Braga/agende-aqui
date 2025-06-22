import { useState } from 'react'
import { createPrescriptionUseCase, type CreatePrescriptionInput } from '../useCases/createPrescription'
import type { PrescriptionData } from '../../infrastructure/prescriptionService'

export function useCreatePrescription() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function execute(data: {
    patientId: string
    patientName: string
    appointmentId: string
    prescriptionData: PrescriptionData
  }) {
    setLoading(true)
    setError(null)
    setFieldErrors({})
    
    try {
      const input: CreatePrescriptionInput = {
        patientId: data.patientId,
        patientName: data.patientName,
        appointmentId: data.appointmentId,
        prescriptionData: data.prescriptionData
      }
      
      const result = await createPrescriptionUseCase(input)
      return result
    } catch (err: any) {
      console.error('Erro ao criar prescrição:', err)
      
      if (err.name === 'ValidationError') {
        setFieldErrors(err.inner.reduce((acc: Record<string, string>, field: any) => {
          acc[field.path] = field.message
          return acc
        }, {}))
      } else {
        setError(err.message || 'Erro ao criar prescrição')
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading, error, fieldErrors }
} 