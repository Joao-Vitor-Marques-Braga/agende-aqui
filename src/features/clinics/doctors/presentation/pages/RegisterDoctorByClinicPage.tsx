import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Header } from '../../../../../shared/components'
import { useRegisterDoctorByClinic } from '../../application/hooks/useRegisterDoctorByClinic'

export function RegisterDoctorByClinicPage() {
    const [formData, setFormData] = useState({
        name: '',
        crm: '',
        specialty: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const navigate = useNavigate()

    const { execute, loading, error, fieldErrors, success, clearError, clearSuccess } = useRegisterDoctorByClinic()

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
        // Limpa erros do servidor quando o usuário começa a digitar
        if (fieldErrors[field] || error) {
            clearError()
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name) newErrors.name = 'Nome é obrigatório'
        if (!formData.crm) newErrors.crm = 'CRM é obrigatório'
        if (!formData.specialty) newErrors.specialty = 'Especialidade é obrigatória'
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
                name: formData.name,
                crm: formData.crm,
                specialty: formData.specialty,
                email: formData.email,
                password: formData.password,
                phone: formData.phone
            })
            
            // Limpa o formulário após sucesso
            setFormData({
                name: '',
                crm: '',
                specialty: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: ''
            })
        } catch (err) {
            console.error('Erro no submit:', err)
        }
    }

    const handleBackToDashboard = () => {
        clearSuccess()
        navigate('/clinica/dashboard')
    }

    const handleRegisterAnother = () => {
        clearSuccess()
        setFormData({
            name: '',
            crm: '',
            specialty: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: ''
        })
    }

    // Combina erros de validação local com erros do servidor
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
                                    CADASTRAR MÉDICO PARA SUA CLÍNICA
                                </p>
                                <h2 className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>
                                    Novo Médico
                                </h2>
                            </div>

                            {/* Exibir sucesso */}
                            {success && (
                                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                    <div className="flex items-center mb-4">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Médico cadastrado com sucesso!</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleRegisterAnother}
                                            className="flex-1 px-4 py-2 text-green-700 border border-green-400 rounded hover:bg-green-50 transition-colors"
                                        >
                                            Cadastrar Outro
                                        </button>
                                        <button
                                            onClick={handleBackToDashboard}
                                            className="flex-1 px-4 py-2 text-white rounded hover:opacity-90 transition-colors"
                                            style={{ backgroundColor: '#26348A' }}
                                        >
                                            Voltar ao Dashboard
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Exibir erro geral */}
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
                                        placeholder="Nome completo do médico"
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
                                        type="text"
                                        placeholder="CRM do médico"
                                        value={formData.crm}
                                        onChange={(e) => handleInputChange('crm', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().crm && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().crm}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Especialidade"
                                        value={formData.specialty}
                                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().specialty && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().specialty}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="tel"
                                        placeholder="Telefone do médico"
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
                                        placeholder="Email do médico"
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
                                        placeholder="Senha do médico"
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
                                        placeholder="Confirmar senha"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        required
                                    />
                                    {getAllErrors().confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">{getAllErrors().confirmPassword}</p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        onClick={handleBackToDashboard}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        loading={loading}
                                        disabled={success}
                                    >
                                        Cadastrar Médico
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 