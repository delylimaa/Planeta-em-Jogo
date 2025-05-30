
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { toast } from "sonner";

interface TelaAgendarAtendimentoProps {
  onVoltar: () => void;
}

const TelaAgendarAtendimento = ({ onVoltar }: TelaAgendarAtendimentoProps) => {
  const [paciente, setPaciente] = useState('');
  const [medico, setMedico] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const handleAgendar = () => {
    if (!paciente || !medico || !data || !hora) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }
    
    // Aqui você implementaria a lógica para agendar no backend
    console.log("Atendimento agendado:", { paciente, medico, data, hora });
    toast.success("Atendimento agendado com sucesso!");
    
    // Limpar formulário
    setPaciente('');
    setMedico('');
    setData('');
    setHora('');
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
          <Calendar className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Agendar Atendimento</h2>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Dados do Agendamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paciente">Paciente</Label>
            <Input
              id="paciente"
              type="text"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              placeholder="Nome do paciente"
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medico">Médico</Label>
            <Input
              id="medico"
              type="text"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
              placeholder="Nome do médico"
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hora">Hora</Label>
            <Input
              id="hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="h-11"
            />
          </div>
          
          <Button 
            onClick={handleAgendar} 
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Agendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelaAgendarAtendimento;
