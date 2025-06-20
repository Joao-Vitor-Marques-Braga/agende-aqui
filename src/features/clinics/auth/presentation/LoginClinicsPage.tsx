import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Header } from '../../../../shared/components'
import { useLoginClinics } from '../application/hooks/useLoginClinics'

export function LoginClinicsPage() {
    const [cnpj, setCnpj] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { execute, loading, error, clearError } = useLoginClinics()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await execute({ cnpj, password })
            navigate('/clinica/dashboard')
        } catch (err) {
            console.error('Erro no submit do login:', err)
        }
    }

    const handleInputChange = (field: 'cnpj' | 'password', value: string) => {
        if (field === 'cnpj') {
            const cleanValue = value.replace(/[^\d]/g, '').substring(0, 14)
            setCnpj(cleanValue)
        } else {
            setPassword(value)
        }
        
        if (error) {
            clearError()
        }
    }

    const formatCNPJ = (value: string) => {
        const cleanValue = value.replace(/[^\d]/g, '')
        
        if (cleanValue.length <= 2) return cleanValue
        if (cleanValue.length <= 5) return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2)}`
        if (cleanValue.length <= 8) return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5)}`
        if (cleanValue.length <= 12) return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8)}`
        return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8, 12)}-${cleanValue.slice(12, 14)}`
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
                                    FAÇA O LOGIN PARA PRESTAR ATENDIMENTOS
                                </p>
                                <h2 className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>Login</h2>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="CNPJ da clínica (XX.XXX.XXX/XXXX-XX)"
                                        value={formatCNPJ(cnpj)}
                                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                                        required
                                        maxLength={18}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Digite apenas os números do CNPJ
                                    </p>
                                </div>

                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        required
                                    />
                                </div>

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
                                    disabled={cnpj.replace(/[^\d]/g, '').length !== 14 || password.length < 6}
                                >
                                    Entrar
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-500">ou:</span>
                                </div>

                                <div className="text-center">
                                    <span className="text-gray-600">
                                        Não faz parte do nosso sistema?{' '}
                                        <Link
                                            to="/clinica/register"
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

                                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-gray-600 text-sm mb-2">
                                        Você é paciente?
                                    </p>
                                    <Link
                                        to="/paciente/login"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors"
                                        style={{ backgroundColor: '#26348A' }}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Acesso Paciente
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