import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="text-white" style={{ backgroundColor: '#26348A' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/dashboard">
              <h1 className="text-2xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
                Agende aqui!
              </h1>
            </Link>
          </div>
          
          <nav className="flex space-x-8">
            <Link 
              to="/dashboard" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/dashboard') || isActiveRoute('/') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              AGENDAMENTOS
            </Link>
            <Link 
              to="/receitas" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/receitas') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              RECEITAS
            </Link>
            <Link 
              to="/reuniao" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/reuniao') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              PARTICIPAR DA REUNIÃO
            </Link>

            <Link 
              to="/login" 
              className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium border-b-2 ${
                isActiveRoute('/login') ? 'border-white' : 'border-transparent hover:border-blue-200'
              }`}
            >
              SAIR
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 