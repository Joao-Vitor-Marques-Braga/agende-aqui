import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Header } from '../../../../shared/components'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log('Login:', { email, password })
        setLoading(false)
        navigate('/dashboard')
    }

    const handleGoogleLogin = () => {
        console.log('Login com Google')
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
                                    FAÇA O LOGIN PARA PREENCHIMENTO AUTOMÁTICO DO AGENDAMENTO
                                </p>
                                <h2 className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>Login</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Input
                                    type="password"
                                    placeholder="senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className="text-right">
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm transition-colors hover:underline"
                                        style={{ color: '#26348A' }}
                                    >
                                        Esqueceu a senha?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={loading}
                                    onClick={handleSubmit}
                                >
                                    Entrar
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-500">ou:</span>
                                </div>

                                <Button
                                    type="button"
                                    variant="google"
                                    className="w-full"
                                    onClick={handleGoogleLogin}
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
                                        Não possui conta?{' '}
                                        <Link
                                            to="/register"
                                            className="font-medium transition-colors hover:underline"
                                            style={{ color: '#26348A' }}
                                        >
                                            Crie uma aqui
                                        </Link>
                                    </span>
                                </div>
                                    
                                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-gray-600 text-sm mb-2">
                                        Você é médico?
                                    </p>
                                    <Link 
                                        to="/medico/login" 
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors"
                                        style={{ backgroundColor: '#26348A' }}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Acesso Médico
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 