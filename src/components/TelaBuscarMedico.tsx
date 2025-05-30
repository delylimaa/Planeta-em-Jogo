
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { toast } from "sonner";
import { medicoDAO } from '@/dao/MedicoDAO';
import { Medico } from '@/types/database';

interface TelaBuscarMedicoProps {
  onVoltar: () => void;
}

const TelaBuscarMedico = ({ onVoltar }: TelaBuscarMedicoProps) => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Medico[]>([]);
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = async () => {
    if (!busca.trim()) {
      toast.error("Por favor, digite o nome do médico!");
      return;
    }
    
    setBuscando(true);

    try {
      const resultado = await medicoDAO.buscarPorNome(busca.trim());
      
      if (resultado.success) {
        setResultados(resultado.data || []);
        if (resultado.data?.length === 0) {
          toast.info("Nenhum médico encontrado com esse nome");
        } else {
          toast.success(`${resultado.data?.length} médico(s) encontrado(s)`);
        }
      } else {
        toast.error(resultado.error || "Erro ao buscar médicos");
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
          <Search className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Buscar Médico</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Localizar Médico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="busca">Digite o nome do médico</Label>
            <Input
              id="busca"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nome do médico"
              className="h-11"
              disabled={buscando}
            />
          </div>
          
          <Button 
            onClick={handleBuscar} 
            className="w-full h-11 bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-2"
            disabled={buscando}
          >
            <Search className="h-4 w-4" />
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
              {resultados.map((medico) => (
                <div key={medico.id} className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-lg">{medico.nome}</h3>
                  <p className="text-gray-600">Especialidade: {medico.especialidade}</p>
                  <p className="text-gray-600">CRM: {medico.crm}</p>
                  <p className="text-xs text-gray-400">ID: {medico.id}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TelaBuscarMedico;
