import * as Yup from 'yup'

export const clinicsRegisterSchema = Yup.object({
  cnpj: Yup.string().required('CNPJ é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
})
