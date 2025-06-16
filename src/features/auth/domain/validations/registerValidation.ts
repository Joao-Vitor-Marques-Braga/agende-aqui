import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Senha mínima de 6 caracteres').required('Senha é obrigatória'),
})
