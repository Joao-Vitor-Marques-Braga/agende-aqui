import * as Yup from 'yup'

export const prescriptionValidationSchema = Yup.object({
  patientName: Yup.string()
    .required('Nome do paciente é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  medications: Yup.string()
    .required('Medicamentos são obrigatórios')
    .min(5, 'Descrição dos medicamentos deve ter pelo menos 5 caracteres'),
  dosage: Yup.string()
    .required('Dosagem é obrigatória')
    .min(3, 'Dosagem deve ter pelo menos 3 caracteres'),
  instructions: Yup.string()
    .required('Instruções são obrigatórias')
    .min(10, 'Instruções devem ter pelo menos 10 caracteres'),
  duration: Yup.string()
    .required('Duração do tratamento é obrigatória')
    .min(3, 'Duração deve ter pelo menos 3 caracteres'),
  observations: Yup.string()
    .optional()
    .max(500, 'Observações devem ter no máximo 500 caracteres')
}) 