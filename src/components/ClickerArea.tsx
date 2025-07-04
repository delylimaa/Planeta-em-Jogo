
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ClickerAreaProps {
  onColetar: (tipo: 'madeira' | 'energia' | 'dinheiro' | 'agua' | 'ferro' | 'carbono') => void;
  nivelPlaneta: string;
}

export const ClickerArea: React.FC<ClickerAreaProps> = ({ onColetar, nivelPlaneta }) => {
  const getBackgroundClass = () => {
    switch (nivelPlaneta) {
      case 'saudavel': return 'bg-gradient-to-b from-green-100 to-green-200';
      case 'alerta': return 'bg-gradient-to-b from-yellow-100 to-yellow-200';
      case 'critico': return 'bg-gradient-to-b from-orange-100 to-orange-200';
      case 'catastrofico': return 'bg-gradient-to-b from-red-100 to-red-200';
      default: return 'bg-gradient-to-b from-green-100 to-green-200';
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className={`p-8 ${getBackgroundClass()}`}>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Colete Recursos</h3>
          <p className="text-muted-foreground">Clique nos botões para coletar recursos e construir seu mundo</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <Button
              onClick={() => onColetar('madeira')}
              className="h-16 text-sm bg-green-600 hover:bg-green-700"
            >
              🌳 Coletar<br />Madeira (+5)
            </Button>
            
            <Button
              onClick={() => onColetar('energia')}
              className="h-16 text-sm bg-yellow-600 hover:bg-yellow-700"
            >
              ⚡ Gerar<br />Energia (+3)
            </Button>
            
            <Button
              onClick={() => onColetar('dinheiro')}
              className="h-16 text-sm bg-blue-600 hover:bg-blue-700"
            >
              💰 Ganhar<br />Dinheiro (+2)
            </Button>

            <Button
              onClick={() => onColetar('agua')}
              className="h-16 text-sm bg-cyan-600 hover:bg-cyan-700"
            >
              💧 Coletar<br />Água (+4)
            </Button>

            <Button
              onClick={() => onColetar('ferro')}
              className="h-16 text-sm bg-gray-600 hover:bg-gray-700"
            >
              ⛏️ Extrair<br />Ferro (+2)
            </Button>

            <Button
              onClick={() => onColetar('carbono')}
              className="h-16 text-sm bg-emerald-600 hover:bg-emerald-700"
            >
              🌿 Absorver<br />Carbono (+3)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
