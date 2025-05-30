
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { toast } from "sonner";
import { atendimentoDAO } from '@/dao/AtendimentoDAO';
import { medicoDAO } from '@/dao/MedicoDAO';
import { pacienteDAO } from '@/dao/PacienteDAO';
import { Atendimento, Medico, Paciente } from '@/types/database';

interface TelaBuscarAtendimentoProps {
  onVoltar: () => void;
}

interface AtendimentoCompleto extends Atendimento {
  medico?: Medico;
  paciente?: Paciente;
}

const TelaBuscarAtendimento = ({ onVoltar }: TelaBuscarAtendimentoProps) => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<AtendimentoCompleto[]>([]);
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = async () => {
    if (!busca.trim()) {
      toast.error("Por favor, digite um termo para buscar!");
      return;
    }
    
    setBuscando(true);

    try {
      // Buscar médicos
      const resultadoMedicos = await medicoDAO.buscarPorNome(busca.trim());
      let atendimentosEncontrados: AtendimentoCompleto[] = [];

      if (resultadoMedicos.success && resultadoMedicos.data) {
        for (const medico of resultadoMedicos.data) {
          const atendimentosPorMedico = await atendimentoDAO.buscarPorMedico(medico.id!);
          if (atendimentosPorMedico.success && atendimentosPorMedico.data) {
            const atendimentosComMedico = atendimentosPorMedico.data.map(atendimento => ({
              ...atendimento,
              medico
            }));
            atendimentosEncontrados.push(...atendimentosComMedico);
          }
        }
      }

      // Buscar pacientes
      const resultadoPacientes = await pacienteDAO.buscarPorNome(busca.trim());
      if (resultadoPacientes.success && resultadoPacientes.data) {
        for (const paciente of resultadoPacientes.data) {
          const atendimentosPorPaciente = await atendimentoDAO.buscarPorPaciente(paciente.id!);
          if (atendimentosPorPaciente.success && atendimentosPorPaciente.data) {
            const atendimentosComPaciente = atendimentosPorPaciente.data.map(atendimento => {
              // Verifica se já não foi adicionado pela busca de médico
              const jaExiste = atendimentosEncontrados.some(a => a.id === atendimento.id);
              if (!jaExiste) {
                return {
                  ...atendimento,
                  paciente
                };
              }
              return null;
            }).filter(Boolean) as AtendimentoCompleto[];
            atendimentosEncontrados.push(...atendimentosComPaciente);
          }
        }
      }

      // Buscar informações complementares dos atendimentos
      for (const atendimento of atendimentosEncontrados) {
        if (!atendimento.medico) {
          const medicoResult = await medicoDAO.buscarPorId(atendimento.medicoId);
          if (medicoResult.success) {
            atendimento.medico = medicoResult.data;
          }
        }
        if (!atendimento.paciente) {
          const pacienteResult = await pacienteDAO.buscarPorId(atendimento.pacienteId);
          if (pacienteResult.success) {
            atendimento.paciente = pacienteResult.data;
          }
        }
      }

      setResultados(atendimentosEncontrados);
      
      if (atendimentosEncontrados.length === 0) {
        toast.info("Nenhum atendimento encontrado");
      } else {
        toast.success(`${atendimentosEncontrados.length} atendimento(s) encontrado(s)`);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado na busca");
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !buscando) {
      handleBuscar();
    }
  };

  const formatarStatus = (status: string) => {
    const statusMap: { [key: string]: { label: string; color: string } } = {
      'agendado': { label: 'Agendado', color: 'text-blue-600' },
      'realizado': { label: 'Realizado', color: 'text-green-600' },
      'cancelado': { label: 'Cancelado', color: 'text-red-600' }
    };
    return statusMap[status] || { label: status, color: 'text-gray-600' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onVoltar}
          className="flex items-center gap-2"
          disabled={buscando}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Buscar Atendimento</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Localizar Atendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="busca">Digite o nome do paciente ou médico</Label>
            <Input
              id="busca"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nome para buscar atendimento"
              className="h-11"
              disabled={buscando}
            />
          </div>
          
          <Button 
            onClick={handleBuscar} 
            className="w-full h-11 bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
            disabled={buscando}
          >
            <Search className="h-4 w-4" />
            {buscando ? "Buscando..." : "Buscar"}
          </Button>
        </CardContent>
      </Card>

      {resultados.length > 0 && (
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resultados.map((atendimento) => {
                const statusInfo = formatarStatus(atendimento.status);
                return (
                  <div key={atendimento.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Informações do Atendimento</h3>
                        <p className="text-gray-600">Data: {new Date(atendimento.dataAtendimento).toLocaleDateString('pt-BR')}</p>
                        <p className="text-gray-600">Horário: {atendimento.horario}</p>
                        <p className={`font-semibold ${statusInfo.color}`}>Status: {statusInfo.label}</p>
                        {atendimento.observacoes && (
                          <p className="text-gray-600 mt-2">Observações: {atendimento.observacoes}</p>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Médico</h4>
                        <p className="text-gray-700">{atendimento.medico?.nome || 'Não informado'}</p>
                        <p className="text-gray-600 text-sm">{atendimento.medico?.especialidade}</p>
                        
                        <h4 className="font-semibold mb-2 mt-3">Paciente</h4>
                        <p className="text-gray-700">{atendimento.paciente?.nome || 'Não informado'}</p>
                        <p className="text-gray-600 text-sm">{atendimento.paciente?.cpf}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">ID do Atendimento: {atendimento.id}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TelaBuscarAtendimento;
