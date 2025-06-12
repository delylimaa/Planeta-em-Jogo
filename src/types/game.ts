
export interface GameState {
  recursos: {
    madeira: number;
    energia: number;
    dinheiro: number;
    agua: number;
    ferro: number;
    carbono: number;
  };
  construcoes: {
    usinasCarvao: number;
    usinasRenováveis: number;
    fabricas: number;
    reflorestamento: number;
    cidadesVerdes: number;
    usinasEolicas: number;
    usinasHidreletricas: number;
    centrosReciclagem: number;
    laboratorios: number;
    parquesNacionais: number;
  };
  impactoAmbiental: {
    poluicao: number;
    desmatamento: number;
    aquecimentoGlobal: number;
    poluicaoAgua: number;
    extincaoEspecies: number;
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
    agua?: number;
    ferro?: number;
    carbono?: number;
  };
  producao: {
    madeira?: number;
    energia?: number;
    dinheiro?: number;
    agua?: number;
    ferro?: number;
    carbono?: number;
  };
  impacto: {
    poluicao?: number;
    desmatamento?: number;
    aquecimentoGlobal?: number;
    poluicaoAgua?: number;
    extincaoEspecies?: number;
  };
  descricao: string;
  tipo: 'poluente' | 'sustentavel' | 'neutro';
}
