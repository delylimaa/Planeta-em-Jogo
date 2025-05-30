
import { Paciente, DatabaseResult } from '@/types/database';
import { database } from '@/services/database';

export class PacienteDAO {
  async criar(paciente: Omit<Paciente, 'id' | 'dataCreacao'>): Promise<DatabaseResult<Paciente>> {
    try {
      // Validações básicas
      if (!paciente.nome || !paciente.dataNascimento || !paciente.cpf) {
        return { success: false, error: "Todos os campos são obrigatórios" };
      }

      // Simula verificação de CPF único
      const pacientesExistentes = database.selectAllPacientes();
      if (pacientesExistentes.some(p => p.cpf === paciente.cpf)) {
        return { success: false, error: "CPF já cadastrado" };
      }

      const novoPaciente = database.insertPaciente(paciente);
      console.log("PacienteDAO.criar() - Paciente cadastrado com sucesso:", novoPaciente);
      
      return { success: true, data: novoPaciente };
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async buscarPorId(id: number): Promise<DatabaseResult<Paciente>> {
    try {
      const paciente = database.selectPacienteById(id);
      if (paciente) {
        return { success: true, data: paciente };
      }
      return { success: false, error: "Paciente não encontrado" };
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async buscarPorNome(nome: string): Promise<DatabaseResult<Paciente[]>> {
    try {
      const pacientes = database.selectPacientesByNome(nome);
      console.log("PacienteDAO.buscarPorNome() - Resultado:", pacientes);
      return { success: true, data: pacientes };
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async listarTodos(): Promise<DatabaseResult<Paciente[]>> {
    try {
      const pacientes = database.selectAllPacientes();
      return { success: true, data: pacientes };
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }
}

export const pacienteDAO = new PacienteDAO();
