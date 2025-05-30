
// Simulação de tipos de dados do SQLite
export interface Medico {
  id?: number;
  nome: string;
  especialidade: string;
  crm: string;
  dataCreacao?: string;
}

export interface Paciente {
  id?: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  dataCreacao?: string;
}

export interface Atendimento {
  id?: number;
  medicoId: number;
  pacienteId: number;
  dataAtendimento: string;
  horario: string;
  observacoes?: string;
  status: 'agendado' | 'realizado' | 'cancelado';
  dataCreacao?: string;
}

export interface DatabaseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
