
import React from 'react';
import { GameState } from '@/types/game';
import { Leaf, Zap, DollarSign, Droplets, Wrench, TreePine } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RecursoDisplayProps {
  recursos: GameState['recursos'];
}

export const RecursoDisplay: React.FC<RecursoDisplayProps> = ({ recursos }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardContent className="p-3 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-xs text-muted-foreground">Madeira</p>
            <p className="text-lg font-bold">{recursos.madeira}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-xs text-muted-foreground">Energia</p>
            <p className="text-lg font-bold">{recursos.energia}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-xs text-muted-foreground">Dinheiro</p>
            <p className="text-lg font-bold">{recursos.dinheiro}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs text-muted-foreground">Água</p>
            <p className="text-lg font-bold">{recursos.agua}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-xs text-muted-foreground">Ferro</p>
            <p className="text-lg font-bold">{recursos.ferro}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-xs text-muted-foreground">Carbono</p>
            <p className="text-lg font-bold">{recursos.carbono}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
