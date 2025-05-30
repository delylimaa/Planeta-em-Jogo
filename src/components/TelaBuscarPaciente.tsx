
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { toast } from "sonner";
import { pacienteDAO } from '@/dao/PacienteDAO';
import { Paciente } from '@/types/database';

interface TelaBuscarPacienteProps {
  onVoltar: () => void;
}

const TelaBuscarPaciente = ({ onVoltar }: TelaBuscarPacienteProps) => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Paciente[]>([]);
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = async () => {
    if (!busca.trim()) {
      toast.error("Por favor, digite o nome do paciente!");
      return;
    }
    
    setBuscando(true);

    try {
      const resultado = await pacienteDAO.buscarPorNome(busca.trim());
      
      if (resultado.success) {
        setResultados(resultado.data || []);
        if (resultado.data?.length === 0) {
          toast.info("Nenhum paciente encontrado com esse nome");
        } else {
          toast.success(`${resultado.data?.length} paciente(s) encontrado(s)`);
        }
      } else {
        toast.error(resultado.error || "Erro ao buscar pacientes");
        setResultados([]);
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
          <Users className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">Buscar Paciente</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Localizar Paciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="busca">Digite o nome do paciente</Label>
            <Input
              id="busca"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nome do paciente"
              className="h-11"
              disabled={buscando}
            />
          </div>
          
          <Button 
            onClick={handleBuscar} 
            className="w-full h-11 bg-orange-600 hover:bg-orange-700 transition-colors flex items-center gap-2"
            disabled={buscando}
          >
            <Users className="h-4 w-4" />
            {buscando ? "Buscando..." : "Buscar"}
          </Button>
        </CardContent>
      </Card>

      {resultados.length > 0 && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resultados.map((paciente) => (
                <div key={paciente.id} className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-lg">{paciente.nome}</h3>
                  <p className="text-gray-600">Data de Nascimento: {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}</p>
                  <p className="text-gray-600">CPF: {paciente.cpf}</p>
                  <p className="text-xs text-gray-400">ID: {paciente.id}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TelaBuscarPaciente;
