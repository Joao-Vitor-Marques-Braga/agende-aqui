import { loginDoctorByCRM } from '../../infrastructure/doctorAuthService'
import { doctorLoginSchema } from '../../domain/validations/doctorLoginValidation'

export async function loginDoctorUser(data: { crm: string; password: string }) {
  await doctorLoginSchema.validate(data)
  return loginDoctorByCRM(data.crm, data.password)
}
