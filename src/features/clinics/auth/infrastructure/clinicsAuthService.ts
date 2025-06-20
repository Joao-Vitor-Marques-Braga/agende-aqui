import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../../../shared/services/firebase'

function normalizeCNPJ(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, '')
}

export async function loginClinicsByCNPJ(cnpj: string, password: string) {
  try {
    const normalizedCNPJ = normalizeCNPJ(cnpj)
    console.log('Tentando login da clínica com CNPJ normalizado:', normalizedCNPJ)
    
    const q = query(
      collection(db, 'clinics'), 
      where('role', '==', 'clinica')
    )
    
    const result = await getDocs(q)

    if (result.empty) {
      console.log('Nenhuma clínica encontrada na base de dados')
      throw new Error('Nenhuma clínica encontrada no sistema')
    }

    let clinicDoc = null
    for (const doc of result.docs) {
      const data = doc.data()
      const storedCNPJ = normalizeCNPJ(data.cnpj || '')
      if (storedCNPJ === normalizedCNPJ) {
        clinicDoc = doc
        break
      }
    }

    if (!clinicDoc) {
      console.log('CNPJ não encontrado na base de dados')
      throw new Error('CNPJ não encontrado. Verifique se está cadastrado no sistema.')
    }

    const clinicData = clinicDoc.data()
    const email = clinicData.email

    if (!email) {
      console.log('Email não encontrado para a clínica')
      throw new Error('Email da clínica não encontrado. Entre em contato com o suporte.')
    }

    console.log('Email encontrado para a clínica:', email)
    
    const cred = await signInWithEmailAndPassword(auth, email, password)
    console.log('Login da clínica realizado com sucesso')
    
    return cred.user
  } catch (error: any) {
    console.error('Erro no login da clínica:', error)

    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('Conta não encontrada. Verifique o CNPJ e tente novamente.')
        case 'auth/wrong-password':
          throw new Error('Senha incorreta. Verifique sua senha e tente novamente.')
        case 'auth/invalid-email':
          throw new Error('Email da clínica é inválido. Entre em contato com o suporte.')
        case 'auth/user-disabled':
          throw new Error('Esta conta foi desabilitada. Entre em contato com o suporte.')
        case 'auth/network-request-failed':
          throw new Error('Erro de conexão. Verifique sua internet e tente novamente.')
        case 'auth/too-many-requests':
          throw new Error('Muitas tentativas de login. Aguarde alguns minutos e tente novamente.')
        default:
          throw new Error(`Erro de autenticação: ${error.message}`)
      }
    }
    
    throw error
  }
} 