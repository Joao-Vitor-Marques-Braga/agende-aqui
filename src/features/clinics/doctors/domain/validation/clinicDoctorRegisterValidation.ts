import * as Yup from 'yup'

export const clinicDoctorRegisterSchema = Yup.object({
  name: Yup.string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  crm: Yup.string()
    .required('CRM é obrigatório')
    .matches(/^\d+$/, 'CRM deve conter apenas números'),
  specialty: Yup.string()
    .required('Especialidade é obrigatória')
    .min(2, 'Especialidade deve ter pelo menos 2 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  phone: Yup.string()
    .required('Telefone é obrigatório')
    .min(10, 'Telefone deve ter pelo menos 10 dígitos'),
}) 