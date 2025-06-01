interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  icon?: 'prescription' | 'consultation' | 'success'
}

export function SuccessModal({ isOpen, onClose, title, message, icon = 'success' }: SuccessModalProps) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (icon) {
      case 'prescription':
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'consultation':
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-15 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            {getIcon()}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>
          
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
            style={{ backgroundColor: '#26348A' }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
} 