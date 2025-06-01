import { useState } from 'react'
import { Header, Input, Button } from '../../../../shared/components'

export function TelemedicinePage() {
  const [accessCode, setAccessCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessCode.trim()) {
      alert('Por favor, informe o código de acesso')
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      alert(`Conectando à consulta com código: ${accessCode}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26348A' }}>
      <Header />
      
      <div className="flex flex-col">
        <div className="bg-white rounded-t-[40px] w-full flex-shrink-0 min-h-[91.2vh]">
          <div className="px-4 py-12">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center mb-12 max-w-3xl">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                    INFORME O CÓDIGO/SENHA RECEBIDO EM SEU EMAIL PARA INGRESSAR NA CONSULTA REMOTA AUTOMATICAMENTE:
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="mb-8">
                    <Input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="Digite o código de acesso"
                      className="text-center text-lg py-4"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isLoading || !accessCode.trim()}
                      className="px-8 py-3 text-lg font-medium"
                    >
                      {isLoading ? 'Conectando...' : 'INGRESSAR NA CONSULTA'}
                    </Button>
                  </div>
                </form>

                <div className="mt-12 text-center max-w-2xl">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Instruções:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• O código de acesso foi enviado para seu email</li>
                      <li>• Verifique também a pasta de spam/lixo eletrônico</li>
                      <li>• O código é válido apenas no horário da consulta</li>
                      <li>• Em caso de problemas, entre em contato conosco</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 