
import { Construcao } from '@/types/game';

export const construcoes: Construcao[] = [
  {
    id: 'usinasCarvao',
    nome: 'Usina de Carvão',
    custo: { madeira: 50, dinheiro: 100 },
    producao: { energia: 10, dinheiro: 5 },
    impacto: { poluicao: 15, aquecimentoGlobal: 10 },
    descricao: 'Produz muita energia, mas polui bastante',
    tipo: 'poluente'
  },
  {
    id: 'usinasRenováveis',
    nome: 'Usina Solar',
    custo: { madeira: 30, dinheiro: 200 },
    producao: { energia: 8 },
    impacto: { poluicao: -2 },
    descricao: 'Energia limpa e renovável',
    tipo: 'sustentavel'
  },
  {
    id: 'fabricas',
    nome: 'Fábrica',
    custo: { energia: 20, dinheiro: 150 },
    producao: { dinheiro: 15 },
    impacto: { poluicao: 8, aquecimentoGlobal: 5 },
    descricao: 'Produz dinheiro mas polui o ar',
    tipo: 'poluente'
  },
  {
    id: 'reflorestamento',
    nome: 'Área de Reflorestamento',
    custo: { dinheiro: 80 },
    producao: { madeira: 5 },
    impacto: { poluicao: -5, desmatamento: -10, aquecimentoGlobal: -3 },
    descricao: 'Reduz poluição e produz madeira sustentável',
    tipo: 'sustentavel'
  },
  {
    id: 'cidadesVerdes',
    nome: 'Cidade Verde',
    custo: { madeira: 40, energia: 30, dinheiro: 300 },
    producao: { dinheiro: 20 },
    impacto: { poluicao: -3, aquecimentoGlobal: -2 },
    descricao: 'Moradia sustentável que beneficia o meio ambiente',
    tipo: 'sustentavel'
  }
];
