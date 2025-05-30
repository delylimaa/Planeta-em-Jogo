
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";
import { medicoDAO } from '@/dao/MedicoDAO';

interface TelaCadastrarMedicoProps {
  onVoltar: () => void;
}

const TelaCadastrarMedico = ({ onVoltar }: TelaCadastrarMedicoProps) => {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim() || !especialidade.trim() || !crm.trim()) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    setSalvando(true);

    try {
      const resultado = await medicoDAO.criar({
        nome: nome.trim(),
        especialidade: especialidade.trim(),
        crm: crm.trim()
      });

      if (resultado.success) {
        toast.success("Médico cadastrado com sucesso!");
        console.log("Médico cadastrado:", resultado.data);
        
        // Limpa os campos
        setNome('');
        setEspecialidade('');
        setCrm('');
      } else {
        toast.error(resultado.error || "Erro ao cadastrar médico");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado ao cadastrar médico");
    } finally {
      setSalvando(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !salvando) {
      handleSalvar();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onVoltar}
          className="flex items-center gap-2"
          disabled={salvando}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Cadastrar Médico</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Informações do Médico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nome completo do médico"
              className="h-11"
              disabled={salvando}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="especialidade">Especialidade</Label>
            <Input
              id="especialidade"
              type="text"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Especialidade médica"
              className="h-11"
              disabled={salvando}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crm">CRM</Label>
            <Input
              id="crm"
              type="text"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Número do CRM"
              className="h-11"
              disabled={salvando}
            />
          </div>
          
          <Button 
            onClick={handleSalvar} 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelaCadastrarMedico;
