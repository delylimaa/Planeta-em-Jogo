
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { toast } from "sonner";
import { pacienteDAO } from '@/dao/PacienteDAO';

interface TelaCadastrarPacienteProps {
  onVoltar: () => void;
}

const TelaCadastrarPaciente = ({ onVoltar }: TelaCadastrarPacienteProps) => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim() || !dataNascimento.trim() || !cpf.trim()) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    setSalvando(true);

    try {
      const resultado = await pacienteDAO.criar({
        nome: nome.trim(),
        dataNascimento: dataNascimento,
        cpf: cpf.trim()
      });

      if (resultado.success) {
        toast.success("Paciente cadastrado com sucesso!");
        console.log("Paciente cadastrado:", resultado.data);
        
        // Limpa os campos
        setNome('');
        setDataNascimento('');
        setCpf('');
      } else {
        toast.error(resultado.error || "Erro ao cadastrar paciente");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado ao cadastrar paciente");
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
          <Users className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Cadastrar Paciente</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
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
              placeholder="Nome completo do paciente"
              className="h-11"
              disabled={salvando}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Input
              id="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-11"
              disabled={salvando}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="000.000.000-00"
              className="h-11"
              disabled={salvando}
            />
          </div>
          
          <Button 
            onClick={handleSalvar} 
            className="w-full h-11 bg-green-600 hover:bg-green-700 transition-colors"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelaCadastrarPaciente;
