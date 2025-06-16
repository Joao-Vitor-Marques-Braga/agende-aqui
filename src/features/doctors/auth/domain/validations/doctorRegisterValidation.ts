import * as Yup from 'yup'

export const doctorRegisterSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  crm: Yup.string().required('CRM é obrigatório'),
  specialty: Yup.string().required('Especialidade é obrigatória'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
})
