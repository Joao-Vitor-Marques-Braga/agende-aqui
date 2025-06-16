import * as Yup from 'yup'

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Senha mínima de 6 caracteres').required('Senha é obrigatória'),
})
