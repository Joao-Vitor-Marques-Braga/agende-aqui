import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Header } from '../../../../shared/components'
import { useRegisterClinics } from '../application/hooks/useRegisterClinics'

export function RegisterClinicsPage() {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        cnpj: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const { execute, loading, error, fieldErrors, clearError } = useRegisterClinics()
    const navigate = useNavigate()

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
        if (fieldErrors[field] || error) {
            clearError()
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório'
        if (!formData.name) newErrors.name = 'Nome é obrigatório'
        if (!formData.email) newErrors.email = 'Email é obrigatório'
        if (!formData.phone) newErrors.phone = 'Telefone é obrigatório'
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
            await execute({ 
                cnpj: formData.cnpj, 
                name: formData.name, 
                email: formData.email, 
                phone: formData.phone, 
                password: formData.password 
            })
            navigate('/dashboard')
        } catch (err) {
            console.error('Erro no submit:', err)
        }
    }

    const getAllErrors = () => {
        return { ...errors, ...fieldErrors }
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
                                    CADASTRE SUA CLÍNICA PARA PRESTAR ATENDIMENTOS
                                </p>
                                <h2 className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>Cadastro</h2>
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
                                        placeholder="CNPJ da clínica"
                                        value={formData.cnpj}
                                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().cnpj && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().cnpj}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Nome da clínica"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().name && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().name}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="tel"
                                        placeholder="Telefone da clínica"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().phone && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().phone}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email da clínica"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().email && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().email}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Senha da clínica"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().password && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().password}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Confirmar senha da clínica"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().confirmPassword}</p>
                                    )}
                                </div>

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

                                <div className="text-center">
                                    <span className="text-gray-600">
                                        Já possui conta?{' '}
                                        <Link
                                            to="/clinica/login"
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