import type { Prescription } from '../../features/doctors/prescriptions/infrastructure/prescriptionService'
import type { PatientPrescription } from '../../features/documents/infrastructure/patientPrescriptionService'

type PrescriptionData = Prescription | PatientPrescription

export function generatePrescriptionPDF(prescription: PrescriptionData): void {
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  tempDiv.style.top = '-9999px'
  tempDiv.style.width = '800px'
  tempDiv.style.backgroundColor = 'white'
  tempDiv.style.padding = '40px'
  tempDiv.style.fontFamily = 'Arial, sans-serif'
  tempDiv.style.fontSize = '12px'
  tempDiv.style.lineHeight = '1.4'
  tempDiv.style.color = '#333'

  tempDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #26348A; margin: 0; font-size: 24px; font-weight: bold;">RECEITA MÉDICA</h1>
      <div style="border-bottom: 2px solid #26348A; margin: 20px 0;"></div>
    </div>

    <div style="margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <strong>Médico:</strong> Dr. ${prescription.doctorName}
        </div>
        <div>
          <strong>Data:</strong> ${new Date(prescription.issueDate).toLocaleDateString('pt-BR')}
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <strong>Paciente:</strong> ${prescription.patientName}
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h3 style="color: #26348A; margin-bottom: 10px; font-size: 16px;">PRESCRIÇÃO MÉDICA</h3>
      
      <div style="margin-bottom: 15px;">
        <strong>Medicamentos:</strong>
        <div style="margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #26348A;">
          ${prescription.medications.split('\n').map(line => `<div>${line}</div>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 15px;">
        <strong>Dosagem:</strong>
        <div style="margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #26348A;">
          ${prescription.dosage}
        </div>
      </div>

      <div style="margin-bottom: 15px;">
        <strong>Instruções de Uso:</strong>
        <div style="margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #26348A;">
          ${prescription.instructions.split('\n').map(line => `<div>${line}</div>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 15px;">
        <strong>Duração do Tratamento:</strong>
        <div style="margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #26348A;">
          ${prescription.duration}
        </div>
      </div>
    </div>

    ${prescription.observations ? `
      <div style="margin-bottom: 25px;">
        <h3 style="color: #26348A; margin-bottom: 10px; font-size: 16px;">OBSERVAÇÕES</h3>
        <div style="padding: 10px; background-color: #f8f9fa; border-left: 3px solid #26348A;">
          ${prescription.observations.split('\n').map(line => `<div>${line}</div>`).join('')}
        </div>
      </div>
    ` : ''}

    <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; font-size: 10px; color: #666;">
      <strong>Informações Importantes:</strong>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li>Esta receita é válida por 30 dias a partir da data de emissão</li>
        <li>Mantenha este documento em local seguro</li>
        <li>Em caso de dúvidas, consulte seu médico</li>
        <li>Não compartilhe medicamentos com outras pessoas</li>
      </ul>
    </div>
  `

  document.body.appendChild(tempDiv)

  const generatePDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf')
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - (margin * 2)
      
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const imgWidth = contentWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)
      
      let heightLeft = imgHeight
      let position = margin + imgHeight
      
      while (heightLeft >= pageHeight - margin) {
        position = heightLeft - pageHeight + margin
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', margin, -position, imgWidth, imgHeight)
        heightLeft -= pageHeight - margin
      }
      
      const fileName = prescription.fileName || `receita_${prescription.patientName.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Tente novamente.')
    } finally {
      document.body.removeChild(tempDiv)
    }
  }

  generatePDF()
} 