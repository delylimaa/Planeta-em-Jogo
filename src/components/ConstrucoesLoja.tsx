
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { construcoes } from '@/data/construcoes';
import { GameState } from '@/types/game';

interface ConstrucoesLojaProps {
  gameState: GameState;
  onConstruir: (construcaoId: string) => void;
}

export const ConstrucoesLoja: React.FC<ConstrucoesLojaProps> = ({ 
  gameState, 
  onConstruir 
}) => {
  const podeComprar = (construcao: any) => {
    const { recursos } = gameState;
    return (
      (!construcao.custo.madeira || recursos.madeira >= construcao.custo.madeira) &&
      (!construcao.custo.energia || recursos.energia >= construcao.custo.energia) &&
      (!construcao.custo.dinheiro || recursos.dinheiro >= construcao.custo.dinheiro) &&
      (!construcao.custo.agua || recursos.agua >= construcao.custo.agua) &&
      (!construcao.custo.ferro || recursos.ferro >= construcao.custo.ferro) &&
      (!construcao.custo.carbono || recursos.carbono >= construcao.custo.carbono)
    );
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'sustentavel': return 'border-green-500 bg-green-50';
      case 'poluente': return 'border-red-500 bg-red-50';
      case 'neutro': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getQuantidadeConstruida = (construcaoId: string) => {
    return gameState.construcoes[construcaoId as keyof typeof gameState.construcoes] || 0;
  };

  const getRecursoEmoji = (recurso: string) => {
    switch (recurso) {
      case 'madeira': return '🌳';
      case 'energia': return '⚡';
      case 'dinheiro': return '💰';
      case 'agua': return '💧';
      case 'ferro': return '⛏️';
      case 'carbono': return '🌿';
      default: return '📦';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>🏗️ Construções</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {construcoes.map((construcao) => (
            <Card key={construcao.id} className={`${getTipoColor(construcao.tipo)}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">{construcao.nome}</h4>
                  <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                    {getQuantidadeConstruida(construcao.id)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{construcao.descricao}</p>
                
                <div className="text-xs space-y-1 mb-3">
                  <div><strong>Custo:</strong></div>
                  {Object.entries(construcao.custo).map(([recurso, valor]) => (
                    valor && <div key={recurso}>{getRecursoEmoji(recurso)} {valor} {recurso}</div>
                  ))}
                </div>

                <div className="text-xs space-y-1 mb-3">
                  <div><strong>Produção:</strong></div>
                  {Object.entries(construcao.producao).map(([recurso, valor]) => (
                    valor && <div key={recurso}>{getRecursoEmoji(recurso)} +{valor}/3s {recurso}</div>
                  ))}
                </div>

                <Button
                  onClick={() => onConstruir(construcao.id)}
                  disabled={!podeComprar(construcao)}
                  className="w-full"
                  size="sm"
                >
                  Construir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
