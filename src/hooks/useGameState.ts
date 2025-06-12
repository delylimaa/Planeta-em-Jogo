
import { useState, useCallback } from 'react';
import { GameState } from '@/types/game';

const estadoInicial: GameState = {
  recursos: {
    madeira: 10,
    energia: 5,
    dinheiro: 20,
    agua: 15,
    ferro: 5,
    carbono: 0
  },
  construcoes: {
    usinasCarvao: 0,
    usinasRenováveis: 0,
    fabricas: 0,
    reflorestamento: 0,
    cidadesVerdes: 0,
    usinasEolicas: 0,
    usinasHidreletricas: 0,
    centrosReciclagem: 0,
    laboratorios: 0,
    parquesNacionais: 0
  },
  impactoAmbiental: {
    poluicao: 0,
    desmatamento: 0,
    aquecimentoGlobal: 0,
    poluicaoAgua: 0,
    extincaoEspecies: 0
  },
  pontuacao: 0,
  nivel: 1,
  perguntasCorretas: 0,
  perguntasErradas: 0
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(estadoInicial);

  const adicionarRecursos = useCallback((tipo: keyof GameState['recursos'], quantidade: number) => {
    setGameState(prev => ({
      ...prev,
      recursos: {
        ...prev.recursos,
        [tipo]: Math.max(0, prev.recursos[tipo] + quantidade)
      }
    }));
  }, []);

  const adicionarImpacto = useCallback((tipo: keyof GameState['impactoAmbiental'], quantidade: number) => {
    setGameState(prev => ({
      ...prev,
      impactoAmbiental: {
        ...prev.impactoAmbiental,
        [tipo]: Math.max(0, prev.impactoAmbiental[tipo] + quantidade)
      }
    }));
  }, []);

  const construir = useCallback((construcaoId: string) => {
    setGameState(prev => ({
      ...prev,
      construcoes: {
        ...prev.construcoes,
        [construcaoId]: (prev.construcoes[construcaoId as keyof typeof prev.construcoes] || 0) + 1
      }
    }));
  }, []);

  const responderPergunta = useCallback((correta: boolean) => {
    setGameState(prev => ({
      ...prev,
      perguntasCorretas: correta ? prev.perguntasCorretas + 1 : prev.perguntasCorretas,
      perguntasErradas: !correta ? prev.perguntasErradas + 1 : prev.perguntasErradas,
      pontuacao: prev.pontuacao + (correta ? 100 : -50)
    }));
  }, []);

  const resetarJogo = useCallback(() => {
    setGameState(estadoInicial);
  }, []);

  const calcularNivelPlaneta = useCallback(() => {
    const { poluicao, desmatamento, aquecimentoGlobal, poluicaoAgua, extincaoEspecies } = gameState.impactoAmbiental;
    const impactoTotal = poluicao + desmatamento + aquecimentoGlobal + poluicaoAgua + extincaoEspecies;
    
    if (impactoTotal < 50) return 'saudavel';
    if (impactoTotal < 150) return 'alerta';
    if (impactoTotal < 300) return 'critico';
    return 'catastrofico';
  }, [gameState.impactoAmbiental]);

  return {
    gameState,
    adicionarRecursos,
    adicionarImpacto,
    construir,
    responderPergunta,
    resetarJogo,
    calcularNivelPlaneta,
    setGameState
  };
};
