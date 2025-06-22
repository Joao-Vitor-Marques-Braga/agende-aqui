export function setupErrorSuppression() {
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
    
    if (event.filename && (
      event.filename.includes('chrome-extension://') ||
      event.filename.includes('moz-extension://') ||
      event.filename.includes('safari-extension://')
    )) {
      event.preventDefault()
      return true
    }
  }

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

  window.addEventListener('error', handleError, true)
  window.addEventListener('unhandledrejection', handleUnhandledRejection, true)

  return () => {
    window.removeEventListener('error', handleError, true)
    window.removeEventListener('unhandledrejection', handleUnhandledRejection, true)
  }
}

export function suppressConsoleErrors() {
  const originalConsoleError = console.error
  
  console.error = (...args: any[]) => {
    const message = args.join(' ')
    
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