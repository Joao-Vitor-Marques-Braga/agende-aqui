// Utilitário para suprimir erros conhecidos de extensões do navegador
export function setupErrorSuppression() {
  // Lista de mensagens de erro conhecidas que devem ser suprimidas
  const suppressedErrorMessages = [
    'message channel closed',
    'listener indicated an asynchronous response',
    'Extension context invalidated',
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    'The message port closed before a response was received',
    'Could not establish connection',
    'Receiving end does not exist'
  ]

  // Handler para erros de JavaScript
  const handleError = (event: ErrorEvent) => {
    if (event.message) {
      const shouldSuppress = suppressedErrorMessages.some(suppressedMsg => 
        event.message.toLowerCase().includes(suppressedMsg.toLowerCase())
      )
      
      if (shouldSuppress) {
        console.debug('Erro de extensão suprimido:', event.message)
        event.preventDefault()
        return true
      }
    }
    
    // Suprime erros de script de extensões
    if (event.filename && (
      event.filename.includes('chrome-extension://') ||
      event.filename.includes('moz-extension://') ||
      event.filename.includes('safari-extension://')
    )) {
      event.preventDefault()
      return true
    }
  }

  // Handler para promises rejeitadas
  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    if (event.reason) {
      const errorMessage = event.reason.message || event.reason.toString()
      
      const shouldSuppress = suppressedErrorMessages.some(suppressedMsg => 
        errorMessage.toLowerCase().includes(suppressedMsg.toLowerCase())
      )
      
      if (shouldSuppress) {
        console.debug('Promise rejeitada de extensão suprimida:', errorMessage)
        event.preventDefault()
        return true
      }
    }
  }

  // Adiciona os listeners globais
  window.addEventListener('error', handleError, true)
  window.addEventListener('unhandledrejection', handleUnhandledRejection, true)

  // Retorna função de cleanup
  return () => {
    window.removeEventListener('error', handleError, true)
    window.removeEventListener('unhandledrejection', handleUnhandledRejection, true)
  }
}

// Configuração para suprimir console.error de extensões
export function suppressConsoleErrors() {
  const originalConsoleError = console.error
  
  console.error = (...args: any[]) => {
    const message = args.join(' ')
    
    // Lista de padrões para suprimir
    const suppressPatterns = [
      'message channel closed',
      'listener indicated an asynchronous response',
      'Extension context invalidated',
      'chrome-extension',
      'moz-extension',
      'safari-extension'
    ]
    
    const shouldSuppress = suppressPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    )
    
    if (!shouldSuppress) {
      originalConsoleError(...args)
    }
  }
} 