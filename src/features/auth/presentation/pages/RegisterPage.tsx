import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Header } from '../../../../shared/components'
import { useRegister } from '../../application/hooks/useRegister'
import { loginWithGoogle } from '../../infrastructure/authService'

export function RegisterPage() {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { execute, loading } = useRegister()
    const navigate = useNavigate()

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name) newErrors.name = 'Nome é obrigatório'
        if (!formData.email) newErrors.email = 'Email é obrigatório'
        if (!formData.password) newErrors.password = 'Senha é obrigatória'
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            await execute({ name: formData.name, email: formData.email, password: formData.password })
            navigate('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }

    const handleGoogleSignup = async () => {
        try {
            await loginWithGoogle()
            navigate('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
            <Header />
            <div className="flex flex-col">
                <div className="mb-4"></div>
                <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[89.5vh]">
                    <div className="px-4 py-12 flex justify-center">
                        <div className="max-w-md w-full">
                            <div className="text-center mb-8">
                                <p className="text-sm mb-6 font-medium text-gray-600">
                                    CRIE UMA CONTA PARA PREENCHIMENTO AUTOMÁTICO DO AGENDAMENTO
                                </p>
                                <h2 className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>Cadastro</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    type="text"
                                    placeholder="nome"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                />

                                <Input
                                    type="email"
                                    placeholder="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />

                                <Input
                                    type="password"
                                    placeholder="senha"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    required
                                />

                                <Input
                                    type="password"
                                    placeholder="confirmar senha"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    required
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={loading}
                                >
                                    Cadastrar
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-500">ou:</span>
                                </div>

                                <Button
                                    type="button"
                                    variant="google"
                                    className="w-full"
                                    onClick={handleGoogleSignup}
                                    icon={
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                    }
                                >
                                    Entre com Google
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-600">
                                        Já possui conta?{' '}
                                        <Link
                                            to="/login"
                                            className="font-medium transition-colors hover:underline"
                                            style={{ color: '#26348A' }}
                                        >
                                            Faça login aqui
                                        </Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 