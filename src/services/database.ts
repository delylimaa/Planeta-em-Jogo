
import { Medico, Paciente, Atendimento } from '@/types/database';

// Simulação de banco de dados SQLite em memória
class SQLiteDatabase {
  private medicos: Medico[] = [];
  private pacientes: Paciente[] = [];
  private atendimentos: Atendimento[] = [];
  private nextMedicoId = 1;
  private nextPacienteId = 1;
  private nextAtendimentoId = 1;

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    // Simula a criação das tabelas
    console.log("Banco de dados SQLite inicializado");
    console.log("Tabelas criadas: medicos, pacientes, atendimentos");
  }

  // Métodos para Médicos
  insertMedico(medico: Omit<Medico, 'id' | 'dataCreacao'>): Medico {
    const novoMedico: Medico = {
      ...medico,
      id: this.nextMedicoId++,
      dataCreacao: new Date().toISOString()
    };
    this.medicos.push(novoMedico);
    console.log("INSERT INTO medicos:", novoMedico);
    return novoMedico;
  }

  selectMedicoById(id: number): Medico | null {
    const medico = this.medicos.find(m => m.id === id);
    console.log("SELECT * FROM medicos WHERE id =", id, "->", medico);
    return medico || null;
  }

  selectMedicosByNome(nome: string): Medico[] {
    const resultados = this.medicos.filter(m => 
      m.nome.toLowerCase().includes(nome.toLowerCase())
    );
    console.log("SELECT * FROM medicos WHERE nome LIKE", nome, "->", resultados);
    return resultados;
  }

  selectAllMedicos(): Medico[] {
    console.log("SELECT * FROM medicos ->", this.medicos);
    return [...this.medicos];
  }

  updateMedico(id: number, medico: Partial<Medico>): boolean {
    const index = this.medicos.findIndex(m => m.id === id);
    if (index !== -1) {
      this.medicos[index] = { ...this.medicos[index], ...medico };
      console.log("UPDATE medicos SET ... WHERE id =", id);
      return true;
    }
    return false;
  }

  deleteMedico(id: number): boolean {
    const index = this.medicos.findIndex(m => m.id === id);
    if (index !== -1) {
      this.medicos.splice(index, 1);
      console.log("DELETE FROM medicos WHERE id =", id);
      return true;
    }
    return false;
  }

  // Métodos para Pacientes
  insertPaciente(paciente: Omit<Paciente, 'id' | 'dataCreacao'>): Paciente {
    const novoPaciente: Paciente = {
      ...paciente,
      id: this.nextPacienteId++,
      dataCreacao: new Date().toISOString()
    };
    this.pacientes.push(novoPaciente);
    console.log("INSERT INTO pacientes:", novoPaciente);
    return novoPaciente;
  }

  selectPacienteById(id: number): Paciente | null {
    const paciente = this.pacientes.find(p => p.id === id);
    console.log("SELECT * FROM pacientes WHERE id =", id, "->", paciente);
    return paciente || null;
  }

  selectPacientesByNome(nome: string): Paciente[] {
    const resultados = this.pacientes.filter(p => 
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
    console.log("SELECT * FROM pacientes WHERE nome LIKE", nome, "->", resultados);
    return resultados;
  }

  selectAllPacientes(): Paciente[] {
    console.log("SELECT * FROM pacientes ->", this.pacientes);
    return [...this.pacientes];
  }

  // Métodos para Atendimentos
  insertAtendimento(atendimento: Omit<Atendimento, 'id' | 'dataCreacao'>): Atendimento {
    const novoAtendimento: Atendimento = {
      ...atendimento,
      id: this.nextAtendimentoId++,
      dataCreacao: new Date().toISOString()
    };
    this.atendimentos.push(novoAtendimento);
    console.log("INSERT INTO atendimentos:", novoAtendimento);
    return novoAtendimento;
  }

  selectAtendimentosByMedico(medicoId: number): Atendimento[] {
    const resultados = this.atendimentos.filter(a => a.medicoId === medicoId);
    console.log("SELECT * FROM atendimentos WHERE medico_id =", medicoId, "->", resultados);
    return resultados;
  }

  selectAtendimentosByPaciente(pacienteId: number): Atendimento[] {
    const resultados = this.atendimentos.filter(a => a.pacienteId === pacienteId);
    console.log("SELECT * FROM atendimentos WHERE paciente_id =", pacienteId, "->", resultados);
    return resultados;
  }

  selectAllAtendimentos(): Atendimento[] {
    console.log("SELECT * FROM atendimentos ->", this.atendimentos);
    return [...this.atendimentos];
  }
}

// Singleton do banco de dados
export const database = new SQLiteDatabase();
