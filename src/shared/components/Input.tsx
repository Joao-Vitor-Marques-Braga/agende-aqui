import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border-2 border-gray-200 
            focus:ring-2 focus:ring-blue-200 
            outline-none transition-colors duration-200
            placeholder:text-gray-400
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
            ${className}
          `}
          style={{
            '--focus-border-color': '#26348A',
            '--focus-ring-color': '#26348A33'
          } as React.CSSProperties}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = '#26348A'
              e.target.style.boxShadow = `0 0 0 3px #26348A33`
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.boxShadow = 'none'
            }
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input' 