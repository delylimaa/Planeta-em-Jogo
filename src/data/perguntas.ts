
import { Pergunta } from '@/types/game';

export const perguntas: Pergunta[] = [
  {
    id: 1,
    pergunta: "Qual fonte de energia é considerada renovável?",
    opcoes: ["Carvão", "Energia Solar", "Petróleo", "Gás Natural"],
    respostaCorreta: 1,
    explicacao: "A energia solar é renovável porque vem do sol, uma fonte inesgotável de energia.",
    categoria: 'energia'
  },
  {
    id: 2,
    pergunta: "Quanto tempo leva para uma garrafa plástica se decompoer na natureza?",
    opcoes: ["1 ano", "10 anos", "100 anos", "450 anos"],
    respostaCorreta: 3,
    explicacao: "Uma garrafa plástica pode levar até 450 anos para se decompoer completamente.",
    categoria: 'residuos'
  },
  {
    id: 3,
    pergunta: "Qual atividade consome mais água?",
    opcoes: ["Tomar banho", "Produzir 1kg de carne", "Lavar louça", "Escovar dentes"],
    respostaCorreta: 1,
    explicacao: "Produzir 1kg de carne bovina consome cerca de 15.000 litros de água.",
    categoria: 'agua'
  },
  {
    id: 4,
    pergunta: "O que é o efeito estufa?",
    opcoes: [
      "Resfriamento da Terra",
      "Aquecimento natural da Terra",
      "Destruição da camada de ozônio",
      "Chuva ácida"
    ],
    respostaCorreta: 1,
    explicacao: "O efeito estufa é um processo natural que mantém a Terra aquecida, mas atividades humanas o intensificam.",
    categoria: 'energia'
  },
  {
    id: 5,
    pergunta: "Qual é a principal causa do desmatamento da Amazônia?",
    opcoes: ["Incêndios naturais", "Pecuária", "Construção de cidades", "Turismo"],
    respostaCorreta: 1,
    explicacao: "A pecuária é responsável por cerca de 80% do desmatamento na Amazônia.",
    categoria: 'biodiversidade'
  },
  {
    id: 6,
    pergunta: "Quantas vezes uma folha de papel pode ser reciclada?",
    opcoes: ["2-3 vezes", "5-7 vezes", "10-12 vezes", "Infinitas vezes"],
    respostaCorreta: 1,
    explicacao: "O papel pode ser reciclado de 5 a 7 vezes antes que as fibras se tornem muito curtas.",
    categoria: 'residuos'
  },
  {
    id: 7,
    pergunta: "Qual gás é o principal responsável pelo aquecimento global?",
    opcoes: ["Oxigênio", "Nitrogênio", "Dióxido de Carbono", "Hidrogênio"],
    respostaCorreta: 2,
    explicacao: "O CO2 é o principal gás do efeito estufa emitido pelas atividades humanas.",
    categoria: 'energia'
  },
  {
    id: 8,
    pergunta: "Uma torneira pingando desperdiça quantos litros por dia?",
    opcoes: ["1 litro", "5 litros", "46 litros", "100 litros"],
    respostaCorreta: 2,
    explicacao: "Uma torneira pingando pode desperdiçar até 46 litros de água por dia.",
    categoria: 'agua'
  }
];
