import { useState } from 'react'
import { Header, DoctorCard } from '../../../../shared/components'
import { AppointmentModal } from '../components'
import { useAvailableDoctors } from '../../application/hooks/useAvailableDoctors'

interface Doctor {
  id: string
  name: string
  specialty: string
  image?: string
  rating?: number
  nextAvailable?: string
}

export function DashboardPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { doctors, loading } = useAvailableDoctors()
  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDoctor(null)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <Header />
      
      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[80vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto">

              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Médicos Disponíveis
                </h1>
                <p className="text-gray-600">
                  Selecione um médico para agendar sua consulta
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onClick={handleDoctorClick}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#26348A' }}>
                    {doctors.length}
                  </div>
                  <div className="text-gray-600">Médicos Disponíveis</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {doctors.filter(d => d.nextAvailable?.includes('Hoje')).length}
                  </div>
                  <div className="text-gray-600">Disponíveis Hoje</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {(doctors.reduce((acc, d) => acc + (d.rating || 0), 0) / doctors.length).toFixed(1)}
                  </div>
                  <div className="text-gray-600">Avaliação Média</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
      />
    </div>
  )
} 