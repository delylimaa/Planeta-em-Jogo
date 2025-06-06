
export interface Medicamento {
  id: string;
  nome: string;
  principioAtivo: string;
  dose: string;
  forma: 'comprimido' | 'capsula' | 'liquido' | 'injecao';
  uso: string;
  frequencia: string;
  contraindicacoes: string[];
  interacoes: string[];
  alertas: string[];
  descricao?: string;
}

export interface RegistroUso {
  id: string;
  medicamentoId: string;
  dataHora: Date;
  dose: string;
  observacoes?: string;
}

export interface ResultadoReconhecimento {
  textoReconhecido: string;
  medicamentoEncontrado?: Medicamento;
  confianca: number;
  alertas: string[];
}
