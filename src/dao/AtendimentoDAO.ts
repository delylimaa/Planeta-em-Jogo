
import { Atendimento, DatabaseResult } from '@/types/database';
import { database } from '@/services/database';
import { medicoDAO } from './MedicoDAO';
import { pacienteDAO } from './PacienteDAO';

export class AtendimentoDAO {
  async criar(atendimento: Omit<Atendimento, 'id' | 'dataCreacao'>): Promise<DatabaseResult<Atendimento>> {
    try {
      // Validações básicas
      if (!atendimento.medicoId || !atendimento.pacienteId || !atendimento.dataAtendimento || !atendimento.horario) {
        return { success: false, error: "Todos os campos são obrigatórios" };
      }

      // Verifica se médico existe
      const medicoResult = await medicoDAO.buscarPorId(atendimento.medicoId);
      if (!medicoResult.success) {
        return { success: false, error: "Médico não encontrado" };
      }

      // Verifica se paciente existe
      const pacienteResult = await pacienteDAO.buscarPorId(atendimento.pacienteId);
      if (!pacienteResult.success) {
        return { success: false, error: "Paciente não encontrado" };
      }

      const novoAtendimento = database.insertAtendimento(atendimento);
      console.log("AtendimentoDAO.criar() - Atendimento agendado com sucesso:", novoAtendimento);
      
      return { success: true, data: novoAtendimento };
    } catch (error) {
      console.error("Erro ao agendar atendimento:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async buscarPorMedico(medicoId: number): Promise<DatabaseResult<Atendimento[]>> {
    try {
      const atendimentos = database.selectAtendimentosByMedico(medicoId);
      console.log("AtendimentoDAO.buscarPorMedico() - Resultado:", atendimentos);
      return { success: true, data: atendimentos };
    } catch (error) {
      console.error("Erro ao buscar atendimentos por médico:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async buscarPorPaciente(pacienteId: number): Promise<DatabaseResult<Atendimento[]>> {
    try {
      const atendimentos = database.selectAtendimentosByPaciente(pacienteId);
      console.log("AtendimentoDAO.buscarPorPaciente() - Resultado:", atendimentos);
      return { success: true, data: atendimentos };
    } catch (error) {
      console.error("Erro ao buscar atendimentos por paciente:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async listarTodos(): Promise<DatabaseResult<Atendimento[]>> {
    try {
      const atendimentos = database.selectAllAtendimentos();
      return { success: true, data: atendimentos };
    } catch (error) {
      console.error("Erro ao listar atendimentos:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }
}

export const atendimentoDAO = new AtendimentoDAO();
