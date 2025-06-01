interface Doctor {
  id: string
  name: string
  specialty: string
  image?: string
  rating?: number
  nextAvailable?: string
}

interface DoctorCardProps {
  doctor: Doctor
  onClick: (doctor: Doctor) => void
}

export function DoctorCard({ doctor, onClick }: DoctorCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border border-gray-100"
      onClick={() => onClick(doctor)}
    >
      <div className="flex items-center space-x-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
          style={{ backgroundColor: '#26348A' }}
        >
          {doctor.image ? (
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            doctor.name.charAt(0).toUpperCase()
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          
          {doctor.rating && (
            <div className="flex items-center mt-1">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(doctor.rating!) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {doctor.rating.toFixed(1)}
              </span>
            </div>
          )}
          
          {doctor.nextAvailable && (
            <p className="text-sm text-green-600 mt-1">
              Próximo horário: {doctor.nextAvailable}
            </p>
          )}
        </div>
        
        <div className="text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
} 