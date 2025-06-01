import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'google'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
  icon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'text-white focus:ring-blue-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    google: 'text-white focus:ring-blue-300'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }
  
  const isDisabled = disabled || loading
  
  const getPrimaryStyle = () => {
    if (variant === 'primary' || variant === 'google') {
      return {
        backgroundColor: '#26348A',
        '&:hover': {
          backgroundColor: '#1e2a75'
        }
      }
    }
    return {}
  }
  
  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={(variant === 'primary' || variant === 'google') ? 
        { 
          backgroundColor: '#26348A',
          borderColor: '#26348A'
        } : {}
      }
      onMouseEnter={(e) => {
        if ((variant === 'primary' || variant === 'google') && !isDisabled) {
          e.currentTarget.style.backgroundColor = '#1e2a75'
        }
      }}
      onMouseLeave={(e) => {
        if ((variant === 'primary' || variant === 'google') && !isDisabled) {
          e.currentTarget.style.backgroundColor = '#26348A'
        }
      }}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
} 