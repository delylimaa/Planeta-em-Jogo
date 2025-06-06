
import React from 'react';
import { AlertTriangle, Info, Volume2, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Medicamento, ResultadoReconhecimento } from '@/types/medicamento';
import { vozService } from '@/services/vozService';

interface ResultadoMedicamentoProps {
  resultado: ResultadoReconhecimento;
  onNovaCaptura: () => void;
}

export const ResultadoMedicamento: React.FC<ResultadoMedicamentoProps> = ({ 
  resultado, 
  onNovaCaptura 
}) => {
  const { medicamentoEncontrado, confianca, alertas } = resultado;

  const falarInformacoes = () => {
    if (!medicamentoEncontrado) {
      vozService.falar("Medicamento não identificado. Consulte um farmacêutico.");
      return;
    }

    const texto = `
      Este é ${medicamentoEncontrado.nome} ${medicamentoEncontrado.dose}.
      ${medicamentoEncontrado.uso}.
      ${medicamentoEncontrado.frequencia}.
      ${alertas.length > 0 ? 'Atenção: ' + alertas.join('. ') : ''}
    `;
    
    vozService.falar(texto);
  };

  if (!medicamentoEncontrado) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Medicamento Não Identificado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Não foi possível identificar o medicamento na imagem.
              Tente uma nova foto com melhor iluminação ou consulte um farmacêutico.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={onNovaCaptura} className="flex-1">
              Tentar Novamente
            </Button>
            <Button onClick={falarInformacoes} variant="outline">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-green-600 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          {medicamentoEncontrado.nome}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Confiança: {Math.round(confianca * 100)}%
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Informações básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-700">Princípio Ativo</h4>
            <p className="text-sm">{medicamentoEncontrado.principioAtivo}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700">Dose</h4>
            <p className="text-sm">{medicamentoEncontrado.dose}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700">Uso</h4>
            <p className="text-sm">{medicamentoEncontrado.uso}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700">Frequência</h4>
            <p className="text-sm">{medicamentoEncontrado.frequencia}</p>
          </div>
        </div>

        {/* Alertas */}
        {alertas.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alertas Importantes
            </h4>
            {alertas.map((alerta, index) => (
              <Alert key={index} variant="destructive">
                <AlertDescription className="text-sm">
                  {alerta}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Contraindicações */}
        {medicamentoEncontrado.contraindicacoes.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-orange-700">Contraindicações</h4>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {medicamentoEncontrado.contraindicacoes.map((contra, index) => (
                <li key={index}>{contra}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Interações */}
        {medicamentoEncontrado.interacoes.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-purple-700">Possíveis Interações</h4>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {medicamentoEncontrado.interacoes.map((interacao, index) => (
                <li key={index}>{interacao}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-3 pt-4">
          <Button onClick={onNovaCaptura} variant="outline" className="flex-1">
            <Clock className="w-4 h-4 mr-2" />
            Nova Captura
          </Button>
          <Button onClick={falarInformacoes} className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Ouvir Informações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
