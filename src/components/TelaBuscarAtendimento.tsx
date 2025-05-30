
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { toast } from "sonner";

interface TelaBuscarAtendimentoProps {
  onVoltar: () => void;
}

const TelaBuscarAtendimento = ({ onVoltar }: TelaBuscarAtendimentoProps) => {
  const [busca, setBusca] = useState('');

  const handleBuscar = () => {
    if (!busca.trim()) {
      toast.error("Por favor, digite um termo para buscar!");
      return;
    }
    
    // Aqui você implementaria a lógica de busca no backend
    console.log("Buscando atendimento:", busca);
    toast.info(`Buscando atendimento: ${busca}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
            />
          </div>
          
          <Button 
            onClick={handleBuscar} 
            className="w-full h-11 bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Buscar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelaBuscarAtendimento;
