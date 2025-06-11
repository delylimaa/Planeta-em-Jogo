
export interface GameState {
  recursos: {
    madeira: number;
    energia: number;
    dinheiro: number;
  };
  construcoes: {
    usinasCarvao: number;
    usinasRenováveis: number;
    fabricas: number;
    reflorestamento: number;
    cidadesVerdes: number;
  };
  impactoAmbiental: {
    poluicao: number;
    desmatamento: number;
    aquecimentoGlobal: number;
  };
  pontuacao: number;
  nivel: number;
  perguntasCorretas: number;
  perguntasErradas: number;
}

export interface Pergunta {
  id: number;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
  categoria: 'energia' | 'agua' | 'residuos' | 'biodiversidade';
}

export interface Construcao {
  id: string;
  nome: string;
  custo: {
    madeira?: number;
    energia?: number;
    dinheiro?: number;
  };
  producao: {
    madeira?: number;
    energia?: number;
    dinheiro?: number;
  };
  impacto: {
    poluicao?: number;
    desmatamento?: number;
    aquecimentoGlobal?: number;
  };
  descricao: string;
  tipo: 'poluente' | 'sustentavel' | 'neutro';
}
