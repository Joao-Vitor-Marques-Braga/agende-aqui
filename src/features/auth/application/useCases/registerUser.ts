import { registerWithEmail } from '../../infrastructure/authService'
import { registerValidationSchema } from '../../domain/validations/registerValidation'

export async function registerUser(data: { name: string; email: string; password: string }) {
  await registerValidationSchema.validate(data)
  const user = await registerWithEmail(data.name, data.email, data.password)
  return user
}
