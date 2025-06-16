import { loginWithEmail } from '../../infrastructure/authService'
import { loginValidationSchema } from '../../domain/validations/loginValidation'

export async function loginUser(data: { email: string, password: string }) {
  await loginValidationSchema.validate(data)
  return loginWithEmail(data.email, data.password)
}
