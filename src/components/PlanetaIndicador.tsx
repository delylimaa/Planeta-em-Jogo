
import React from 'react';
import { GameState } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlanetaIndicadorProps {
  impactoAmbiental: GameState['impactoAmbiental'];
  nivelPlaneta: string;
}

export const PlanetaIndicador: React.FC<PlanetaIndicadorProps> = ({ 
  impactoAmbiental, 
  nivelPlaneta 
}) => {
  const getPlanetaEmoji = () => {
    switch (nivelPlaneta) {
      case 'saudavel': return '🌍';
      case 'alerta': return '🌍';
      case 'critico': return '🌫️';
      case 'catastrofico': return '🔥';
      default: return '🌍';
    }
  };

  const getPlanetaColor = () => {
    switch (nivelPlaneta) {
      case 'saudavel': return 'text-green-600';
      case 'alerta': return 'text-yellow-600';
      case 'critico': return 'text-orange-600';
      case 'catastrofico': return 'text-red-600';
      default: return 'text-green-600';
    }
  };

  const getPlanetaStatus = () => {
    switch (nivelPlaneta) {
      case 'saudavel': return 'Planeta Saudável';
      case 'alerta': return 'Alerta Ambiental';
      case 'critico': return 'Estado Crítico';
      case 'catastrofico': return 'Colapso Ecológico';
      default: return 'Planeta Saudável';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-4xl">{getPlanetaEmoji()}</span>
          <span className={getPlanetaColor()}>{getPlanetaStatus()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Poluição</p>
            <p className="text-lg font-bold text-red-600">{impactoAmbiental.poluicao}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Desmatamento</p>
            <p className="text-lg font-bold text-orange-600">{impactoAmbiental.desmatamento}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Aquec. Global</p>
            <p className="text-lg font-bold text-red-600">{impactoAmbiental.aquecimentoGlobal}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Poluição Água</p>
            <p className="text-lg font-bold text-blue-600">{impactoAmbiental.poluicaoAgua}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Extinção</p>
            <p className="text-lg font-bold text-purple-600">{impactoAmbiental.extincaoEspecies}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
