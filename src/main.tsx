import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { setupErrorSuppression, suppressConsoleErrors } from './shared/utils/errorSuppression'

// Configura supressão de erros de extensões do navegador
setupErrorSuppression()
suppressConsoleErrors()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
