
import { Medicamento, ResultadoReconhecimento } from '@/types/medicamento';
import { baseMedicamentos } from '@/data/medicamentos';

export class MedicamentoService {
  private medicamentos: Medicamento[] = baseMedicamentos;

  buscarMedicamentoPorTexto(texto: string): ResultadoReconhecimento {
    const textoLimpo = texto.toLowerCase().trim();
    console.log('Texto reconhecido para busca:', textoLimpo);
    
    let medicamentoEncontrado: Medicamento | undefined;
    let confianca = 0;
    
    // Busca por nome exato ou parcial
    for (const med of this.medicamentos) {
      const nomeMatch = textoLimpo.includes(med.nome.toLowerCase());
      const principioMatch = textoLimpo.includes(med.principioAtivo.toLowerCase());
      const doseMatch = textoLimpo.includes(med.dose);
      
      if (nomeMatch || principioMatch) {
        medicamentoEncontrado = med;
        confianca = nomeMatch ? 0.9 : 0.7;
        if (doseMatch) confianca += 0.1;
        break;
      }
    }
    
    const alertas = this.gerarAlertas(medicamentoEncontrado, textoLimpo);
    
    return {
      textoReconhecido: texto,
      medicamentoEncontrado,
      confianca,
      alertas
    };
  }

  private gerarAlertas(medicamento?: Medicamento, texto?: string): string[] {
    const alertas: string[] = [];
    
    if (!medicamento) {
      alertas.push('Medicamento não identificado. Consulte um farmacêutico.');
      return alertas;
    }
    
    // Verificar se há indicação de vencimento no texto
    if (texto && this.verificarVencimento(texto)) {
      alertas.push('⚠️ ATENÇÃO: Possível medicamento vencido detectado!');
    }
    
    // Adicionar alertas específicos do medicamento
    alertas.push(...medicamento.alertas);
    
    return alertas;
  }
  
  private verificarVencimento(texto: string): boolean {
    // Procura por padrões de data que podem indicar vencimento
    const padraoData = /\d{2}\/\d{2}\/\d{4}|\d{2}\/\d{4}/g;
    const datasEncontradas = texto.match(padraoData);
    
    if (datasEncontradas) {
      const hoje = new Date();
      for (const dataStr of datasEncontradas) {
        try {
          const [mes, ano] = dataStr.split('/').slice(-2);
          const dataVenc = new Date(parseInt(ano), parseInt(mes) - 1);
          if (dataVenc < hoje) {
            return true;
          }
        } catch (error) {
          continue;
        }
      }
    }
    
    return false;
  }
  
  verificarInteracoes(medicamentos: string[]): string[] {
    const interacoes: string[] = [];
    
    for (let i = 0; i < medicamentos.length; i++) {
      for (let j = i + 1; j < medicamentos.length; j++) {
        const med1 = this.medicamentos.find(m => m.nome.toLowerCase() === medicamentos[i].toLowerCase());
        const med2 = this.medicamentos.find(m => m.nome.toLowerCase() === medicamentos[j].toLowerCase());
        
        if (med1 && med2) {
          const interacao1 = med1.interacoes.some(int => 
            int.toLowerCase().includes(med2.nome.toLowerCase()) || 
            int.toLowerCase().includes(med2.principioAtivo.toLowerCase())
          );
          
          if (interacao1) {
            interacoes.push(`⚠️ INTERAÇÃO: ${med1.nome} pode interagir com ${med2.nome}`);
          }
        }
      }
    }
    
    return interacoes;
  }
}

export const medicamentoService = new MedicamentoService();
