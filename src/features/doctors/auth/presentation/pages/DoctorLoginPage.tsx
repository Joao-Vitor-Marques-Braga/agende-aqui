import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header, Input, Button } from '../../../../../shared/components'
import { useDoctorLogin } from '../../application/hooks/useDoctorLogin'

export function DoctorLoginPage() {
  const [crm, setCrm] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { execute, loading } = useDoctorLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      await execute({ crm, password })
      navigate('/medico/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <Header />

      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 h-[91.2vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Acesso Médico
                </h1>
                <p className="text-gray-600">
                  Entre com suas credenciais profissionais
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  label="CRM"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                  placeholder="Digite seu CRM"
                  disabled={loading}
                />

                <Input
                  type="password"
                  label="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  disabled={loading}
                />

                <Button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'ENTRAR'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/medico/esqueci-senha"
                  className="text-sm hover:underline"
                  style={{ color: '#26348A' }}
                >
                  Esqueci minha senha
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm">
                  Paciente?{' '}
                  <Link
                    to="/login"
                    className="font-medium hover:underline"
                    style={{ color: '#26348A' }}
                  >
                    Faça login aqui
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 