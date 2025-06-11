
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pergunta } from '@/types/game';

interface PerguntaModalProps {
  pergunta: Pergunta;
  onResponder: (correta: boolean) => void;
  onFechar: () => void;
}

export const PerguntaModal: React.FC<PerguntaModalProps> = ({ 
  pergunta, 
  onResponder, 
  onFechar 
}) => {
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrandoResultado, setMostrandoResultado] = useState(false);

  const confirmarResposta = () => {
    if (respostaSelecionada === null) return;
    
    const correta = respostaSelecionada === pergunta.respostaCorreta;
    setMostrandoResultado(true);
    onResponder(correta);
  };

  const getCategoriaEmoji = () => {
    switch (pergunta.categoria) {
      case 'energia': return '⚡';
      case 'agua': return '💧';
      case 'residuos': return '♻️';
      case 'biodiversidade': return '🌿';
      default: return '🌍';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{getCategoriaEmoji()}</span>
            Pergunta Educativa
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!mostrandoResultado ? (
            <>
              <p className="text-lg font-semibold mb-4">{pergunta.pergunta}</p>
              
              <div className="space-y-2 mb-6">
                {pergunta.opcoes.map((opcao, index) => (
                  <Button
                    key={index}
                    variant={respostaSelecionada === index ? "default" : "outline"}
                    className="w-full text-left justify-start"
                    onClick={() => setRespostaSelecionada(index)}
                  >
                    {String.fromCharCode(65 + index)}. {opcao}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={confirmarResposta}
                  disabled={respostaSelecionada === null}
                  className="flex-1"
                >
                  Confirmar Resposta
                </Button>
                <Button variant="outline" onClick={onFechar}>
                  Pular
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                {respostaSelecionada === pergunta.respostaCorreta ? (
                  <div>
                    <div className="text-6xl mb-2">✅</div>
                    <h3 className="text-xl font-bold text-green-600">Correto!</h3>
                    <p className="text-green-600">+100 pontos</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-2">❌</div>
                    <h3 className="text-xl font-bold text-red-600">Incorreto!</h3>
                    <p className="text-red-600">-50 pontos</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Explicação:</h4>
                <p className="text-sm">{pergunta.explicacao}</p>
              </div>

              <Button onClick={onFechar} className="w-full">
                Continuar
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
