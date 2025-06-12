
import React, { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { construcoes } from '@/data/construcoes';
import { perguntas } from '@/data/perguntas';
import { RecursoDisplay } from './RecursoDisplay';
import { PlanetaIndicador } from './PlanetaIndicador';
import { ClickerArea } from './ClickerArea';
import { ConstrucoesLoja } from './ConstrucoesLoja';
import { PerguntaModal } from './PerguntaModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EcoClicker: React.FC = () => {
  const {
    gameState,
    adicionarRecursos,
    adicionarImpacto,
    construir,
    responderPergunta,
    resetarJogo,
    calcularNivelPlaneta,
    setGameState
  } = useGameState();

  const [perguntaAtual, setPerguntaAtual] = useState<number | null>(null);
  const [totalCliques, setTotalCliques] = useState(0);

  const nivelPlaneta = calcularNivelPlaneta();

  const coletar = (tipo: 'madeira' | 'energia' | 'dinheiro' | 'agua' | 'ferro' | 'carbono') => {
    const quantidades = { 
      madeira: 5, 
      energia: 3, 
      dinheiro: 2, 
      agua: 4, 
      ferro: 2, 
      carbono: 3 
    };
    
    adicionarRecursos(tipo, quantidades[tipo]);
    setTotalCliques(prev => prev + 1);

    // A cada 20 cliques, mostrar uma pergunta
    if ((totalCliques + 1) % 20 === 0) {
      const perguntaAleatoria = Math.floor(Math.random() * perguntas.length);
      setPerguntaAtual(perguntaAleatoria);
    }
  };

  const construirItem = (construcaoId: string) => {
    const construcaoSelecionada = construcoes.find(c => c.id === construcaoId);
    if (!construcaoSelecionada) return;

    const { recursos } = gameState;
    const { custo } = construcaoSelecionada;

    // Verificar se tem recursos suficientes
    const recursosNecessarios = ['madeira', 'energia', 'dinheiro', 'agua', 'ferro', 'carbono'] as const;
    for (const recurso of recursosNecessarios) {
      if (custo[recurso] && recursos[recurso] < custo[recurso]) {
        return;
      }
    }

    // Subtrair custos
    recursosNecessarios.forEach(recurso => {
      if (custo[recurso]) {
        adicionarRecursos(recurso, -custo[recurso]);
      }
    });

    // Adicionar impactos
    const impactos = ['poluicao', 'desmatamento', 'aquecimentoGlobal', 'poluicaoAgua', 'extincaoEspecies'] as const;
    impactos.forEach(impacto => {
      if (construcaoSelecionada.impacto[impacto]) {
        adicionarImpacto(impacto, construcaoSelecionada.impacto[impacto]);
      }
    });

    construir(construcaoId);
  };

  const handleResponderPergunta = (correta: boolean) => {
    responderPergunta(correta);
    
    if (correta) {
      // Bônus por resposta correta
      adicionarRecursos('dinheiro', 50);
      adicionarImpacto('poluicao', -5);
    } else {
      // Penalidade por resposta errada
      adicionarImpacto('poluicao', 10);
    }
  };

  // Auto-produção das construções
  useEffect(() => {
    const interval = setInterval(() => {
      construcoes.forEach(construcaoConfig => {
        const quantidade = gameState.construcoes[construcaoConfig.id as keyof typeof gameState.construcoes] || 0;
        
        if (quantidade > 0) {
          const { producao } = construcaoConfig;
          
          const recursosProducao = ['madeira', 'energia', 'dinheiro', 'agua', 'ferro', 'carbono'] as const;
          recursosProducao.forEach(recurso => {
            if (producao[recurso]) {
              adicionarRecursos(recurso, producao[recurso] * quantidade);
            }
          });
        }
      });
    }, 3000); // Produção automática a cada 3 segundos

    return () => clearInterval(interval);
  }, [gameState.construcoes, adicionarRecursos]);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🌍 Planeta em Jogo</h1>
        <p className="text-lg text-muted-foreground">
          Um Clicker Educativo sobre Sustentabilidade
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Construa um mundo sustentável e aprenda sobre meio ambiente!
        </p>
      </div>

      <RecursoDisplay recursos={gameState.recursos} />
      <PlanetaIndicador 
        impactoAmbiental={gameState.impactoAmbiental} 
        nivelPlaneta={nivelPlaneta}
      />
      <ClickerArea onColetar={coletar} nivelPlaneta={nivelPlaneta} />
      <ConstrucoesLoja gameState={gameState} onConstruir={construirItem} />

      {/* Estatísticas */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>📊 Estatísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Cliques Totais</p>
              <p className="text-xl font-bold">{totalCliques}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pontuação</p>
              <p className="text-xl font-bold">{gameState.pontuacao}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Acertos</p>
              <p className="text-xl font-bold text-green-600">{gameState.perguntasCorretas}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Erros</p>
              <p className="text-xl font-bold text-red-600">{gameState.perguntasErradas}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Pergunta */}
      {perguntaAtual !== null && (
        <PerguntaModal
          pergunta={perguntas[perguntaAtual]}
          onResponder={handleResponderPergunta}
          onFechar={() => setPerguntaAtual(null)}
        />
      )}

      {/* Botão Reset */}
      <div className="text-center">
        <Button onClick={resetarJogo} variant="outline">
          🔄 Reiniciar Jogo
        </Button>
      </div>
    </div>
  );
};
