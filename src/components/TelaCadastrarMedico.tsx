
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface TelaCadastrarMedicoProps {
  onVoltar: () => void;
}

const TelaCadastrarMedico = ({ onVoltar }: TelaCadastrarMedicoProps) => {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');

  const handleSalvar = () => {
    if (!nome || !especialidade || !crm) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }
    
    // Aqui você implementaria a lógica para salvar no backend
    console.log("Médico cadastrado:", { nome, especialidade, crm });
    toast.success("Médico cadastrado com sucesso!");
    
    // Limpar formulário
    setNome('');
    setEspecialidade('');
    setCrm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onVoltar}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="flex items-center gap-2">
          <UserCheck className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Cadastrar Médico</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Dados do Médico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome completo"
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="especialidade">Especialidade</Label>
            <Input
              id="especialidade"
              type="text"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              placeholder="Digite a especialidade"
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crm">CRM</Label>
            <Input
              id="crm"
              type="text"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
              placeholder="Digite o número do CRM"
              className="h-11"
            />
          </div>
          
          <Button 
            onClick={handleSalvar} 
            className="w-full h-11 bg-green-600 hover:bg-green-700 transition-colors"
          >
            Salvar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelaCadastrarMedico;
