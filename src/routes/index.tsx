import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../features/auth/presentation/pages'
import { DashboardPage } from '../features/dashboard/presentation/pages'
import { PrescriptionsPage } from '../features/documents/presentation/pages'
import { TelemedicinePage } from '../features/telemedicine/presentation/pages'
import { DoctorLoginPage } from '../features/doctors/auth/presentation/pages'
import { 
  DoctorDashboardPage, 
  DoctorPrescriptionsPage, 
  DoctorTelemedicinePage 
} from '../features/doctors/presentation/pages'
import { Header } from '../shared/components'
import { LoginClinicsPage } from '../features/clinics/auth/presentation/LoginClinicsPage'
import { RegisterClinicsPage } from '../features/clinics/auth/presentation/RegisterClinicsPage'
import { DashboardClinicPage } from '@/features/clinics/dashboard/presentation/pages/DashboardClinicPage'
import { RegisterDoctorByClinicPage } from '../features/clinics/doctors/presentation/pages'

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600">Esta página está em desenvolvimento</p>
        </div>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/receitas" element={<PrescriptionsPage />} />
        <Route path="/reuniao" element={<TelemedicinePage />} />
        
        <Route path="/medico/login" element={<DoctorLoginPage />} />
        <Route path="/medico/dashboard" element={<DoctorDashboardPage />} />
        <Route path="/medico/receitas" element={<DoctorPrescriptionsPage />} />
        <Route path="/medico/reuniao" element={<DoctorTelemedicinePage />} />
        
        <Route path="/clinica/login" element={<LoginClinicsPage />} />
        <Route path="/clinica/register" element={<RegisterClinicsPage />} />
        <Route path="/clinica/dashboard" element={<DashboardClinicPage />} />
        <Route path="/clinica/cadastrar-medico" element={<RegisterDoctorByClinicPage />} />
        
        <Route path="/agendamentos" element={<ComingSoon title="Agendamentos" />} />
        <Route path="/forgot-password" element={<ComingSoon title="Esqueci a Senha" />} />
        <Route path="/medico/esqueci-senha" element={<ComingSoon title="Esqueci a Senha - Médico" />} />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}
