
import React from 'react';
import { GameState } from '@/types/game';
import { Leaf, Zap, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RecursoDisplayProps {
  recursos: GameState['recursos'];
}

export const RecursoDisplay: React.FC<RecursoDisplayProps> = ({ recursos }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-sm text-muted-foreground">Madeira</p>
            <p className="text-xl font-bold">{recursos.madeira}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-600" />
          <div>
            <p className="text-sm text-muted-foreground">Energia</p>
            <p className="text-xl font-bold">{recursos.energia}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-sm text-muted-foreground">Dinheiro</p>
            <p className="text-xl font-bold">{recursos.dinheiro}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
