import * as Yup from 'yup'

export const clinicsLoginSchema = Yup.object({
  cnpj: Yup.string()
    .required('CNPJ é obrigatório')
    .test('cnpj-format', 'CNPJ deve ter 14 dígitos ou estar no formato XX.XXX.XXX/XXXX-XX', 
      value => {
        if (!value) return false
        const cleanCnpj = value.replace(/[^\d]/g, '')
        return cleanCnpj.length === 14
      }
    ),
  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
})
