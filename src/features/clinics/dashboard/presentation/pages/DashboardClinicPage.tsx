import { useState } from 'react'
import { Header, DoctorCard } from '../../../../../shared/components'
import { useClinicDoctors } from '../../application/hooks/useClinicDoctors'
import { Link } from 'react-router-dom'

interface Doctor {
  id: string
  name: string
  specialty: string
  image?: string
  rating?: number
  nextAvailable?: string
}

export function DashboardClinicPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { doctors, loading, error } = useClinicDoctors()
  
  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDoctor(null)
  }

  // Converter ClinicDoctor para Doctor para compatibilidade com DoctorCard
  const convertedDoctors: Doctor[] = doctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    rating: 4.5, // Default rating
    nextAvailable: 'Disponível'
  }))

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <Header />
      
      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[80vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto">

              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Painel de Controle da Clínica
                </h1>
                <p className="text-gray-600">
                  Gerencie médicos e acompanhe as atividades da sua clínica
                </p>
              </div>

              {/* Exibir erro se houver */}
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

              {loading ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    Carregando médicos da clínica...
                  </div>
                  <div className="mt-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Card para cadastrar novo médico */}
                    <div className="bg-gray-50 rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                      <Link 
                        to="/clinica/cadastrar-medico"
                        className="block p-6 h-full flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#26348A' }}>
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Cadastrar Médico
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Adicione um novo médico à sua clínica
                        </p>
                      </Link>
                    </div>

                    {/* Cards dos médicos da clínica */}
                    {convertedDoctors.map((doctor) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onClick={handleDoctorClick}
                      />
                    ))}
                  </div>

                  {/* Estatísticas da clínica */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>
                        {doctors.length}
                      </div>
                      <div className="text-gray-600">Médicos da Clínica</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {doctors.filter(d => d.status === 'active').length}
                      </div>
                      <div className="text-gray-600">Médicos Ativos</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {new Set(doctors.map(d => d.specialty)).size}
                      </div>
                      <div className="text-gray-600">Especialidades</div>
                    </div>
                  </div>

                  {/* Mensagem quando não há médicos */}
                  {doctors.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-lg mb-4">
                        Nenhum médico cadastrado ainda
                      </div>
                      <p className="text-gray-400 mb-6">
                        Comece cadastrando médicos para sua clínica
                      </p>
                      <Link
                        to="/clinica/cadastrar-medico"
                        className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
                        style={{ backgroundColor: '#26348A' }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Cadastrar Primeiro Médico
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 