import * as Yup from 'yup'

export const doctorLoginSchema = Yup.object({
  crm: Yup.string().required('CRM é obrigatório'),
  password: Yup.string().min(6, 'Senha mínima de 6 caracteres').required('Senha é obrigatória'),
})
