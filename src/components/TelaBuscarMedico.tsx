
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { toast } from "sonner";

interface TelaBuscarMedicoProps {
  onVoltar: () => void;
}

const TelaBuscarMedico = ({ onVoltar }: TelaBuscarMedicoProps) => {
  const [busca, setBusca] = useState('');

  const handleBuscar = () => {
    if (!busca.trim()) {
      toast.error("Por favor, digite o nome do médico!");
      return;
    }
    
    // Aqui você implementaria a lógica de busca no backend
    console.log("Buscando médico:", busca);
    toast.info(`Buscando médico: ${busca}`);
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
            />
          </div>
          
          <Button 
            onClick={handleBuscar} 
            className="w-full h-11 bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Buscar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelaBuscarMedico;
