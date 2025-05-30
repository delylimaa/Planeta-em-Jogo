
import { Medico, DatabaseResult } from '@/types/database';
import { database } from '@/services/database';

export class MedicoDAO {
  async criar(medico: Omit<Medico, 'id' | 'dataCreacao'>): Promise<DatabaseResult<Medico>> {
    try {
      // Validações básicas
      if (!medico.nome || !medico.especialidade || !medico.crm) {
        return { success: false, error: "Todos os campos são obrigatórios" };
      }

      // Simula verificação de CRM único
      const medicosExistentes = database.selectAllMedicos();
      if (medicosExistentes.some(m => m.crm === medico.crm)) {
        return { success: false, error: "CRM já cadastrado" };
      }

      const novoMedico = database.insertMedico(medico);
      console.log("MedicoDAO.criar() - Médico cadastrado com sucesso:", novoMedico);
      
      return { success: true, data: novoMedico };
    } catch (error) {
      console.error("Erro ao cadastrar médico:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async buscarPorId(id: number): Promise<DatabaseResult<Medico>> {
    try {
      const medico = database.selectMedicoById(id);
      if (medico) {
        return { success: true, data: medico };
      }
      return { success: false, error: "Médico não encontrado" };
    } catch (error) {
      console.error("Erro ao buscar médico:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async buscarPorNome(nome: string): Promise<DatabaseResult<Medico[]>> {
    try {
      const medicos = database.selectMedicosByNome(nome);
      console.log("MedicoDAO.buscarPorNome() - Resultado:", medicos);
      return { success: true, data: medicos };
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async listarTodos(): Promise<DatabaseResult<Medico[]>> {
    try {
      const medicos = database.selectAllMedicos();
      return { success: true, data: medicos };
    } catch (error) {
      console.error("Erro ao listar médicos:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async atualizar(id: number, medico: Partial<Medico>): Promise<DatabaseResult<boolean>> {
    try {
      const sucesso = database.updateMedico(id, medico);
      if (sucesso) {
        return { success: true, data: true };
      }
      return { success: false, error: "Médico não encontrado" };
    } catch (error) {
      console.error("Erro ao atualizar médico:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  async excluir(id: number): Promise<DatabaseResult<boolean>> {
    try {
      const sucesso = database.deleteMedico(id);
      if (sucesso) {
        return { success: true, data: true };
      }
      return { success: false, error: "Médico não encontrado" };
    } catch (error) {
      console.error("Erro ao excluir médico:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }
}

export const medicoDAO = new MedicoDAO();
