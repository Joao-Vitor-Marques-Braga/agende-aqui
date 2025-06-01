import { Link, useLocation } from 'react-router-dom'

export function DoctorHeader() {
  const location = useLocation()

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="text-white" style={{ backgroundColor: '#26348A' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/medico/dashboard">
              <h1 className="text-2xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
                Portal Médico
              </h1>
            </Link>
          </div>
          
          <nav className="flex space-x-8">
            <Link 
              to="/medico/dashboard" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/medico/dashboard') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              CONSULTAS DO DIA
            </Link>
            <Link 
              to="/medico/receitas" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/medico/receitas') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              RECEITAS
            </Link>
            <Link 
              to="/medico/reuniao" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/medico/reuniao') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              CONSULTA REMOTA
            </Link>
            <Link 
              to="/medico/login" 
              className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              SAIR
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 