interface DownloadButtonProps {
  onDownload: () => void
  disabled?: boolean
}
  
export function DownloadButton({ onDownload, disabled = false }: DownloadButtonProps) {
  return (
    <button
      onClick={onDownload}
      disabled={disabled}
      className={`
        bg-blue-100 inline-flex items-center px-4 py-2 rounded-lg font-medium text-black transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
      `}
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      DOWNLOAD
    </button>
  )
} 