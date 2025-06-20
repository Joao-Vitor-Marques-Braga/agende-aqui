import { loginClinicsByCNPJ } from '../../infrastructure/clinicsAuthService'
import { clinicsLoginSchema } from '../../domain/validation/clinicsLoginValidation'

export async function loginClinics(data: { cnpj: string, password: string }) {
  await clinicsLoginSchema.validate(data)
  return loginClinicsByCNPJ(data.cnpj, data.password)
}
