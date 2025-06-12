
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
    custo: { madeira: 30, dinheiro: 200, ferro: 15 },
    producao: { energia: 8 },
    impacto: { poluicao: -2 },
    descricao: 'Energia limpa e renovável',
    tipo: 'sustentavel'
  },
  {
    id: 'fabricas',
    nome: 'Fábrica',
    custo: { energia: 20, dinheiro: 150, agua: 10 },
    producao: { dinheiro: 15, ferro: 3 },
    impacto: { poluicao: 8, aquecimentoGlobal: 5, poluicaoAgua: 5 },
    descricao: 'Produz dinheiro e ferro mas polui',
    tipo: 'poluente'
  },
  {
    id: 'reflorestamento',
    nome: 'Área de Reflorestamento',
    custo: { dinheiro: 80, agua: 20 },
    producao: { madeira: 5, carbono: 8 },
    impacto: { poluicao: -5, desmatamento: -10, aquecimentoGlobal: -3 },
    descricao: 'Reduz poluição e absorve carbono',
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
  },
  {
    id: 'usinasEolicas',
    nome: 'Usina Eólica',
    custo: { ferro: 25, dinheiro: 180 },
    producao: { energia: 7 },
    impacto: { poluicao: -1 },
    descricao: 'Energia limpa através do vento',
    tipo: 'sustentavel'
  },
  {
    id: 'usinasHidreletricas',
    nome: 'Usina Hidrelétrica',
    custo: { ferro: 40, dinheiro: 250, agua: 50 },
    producao: { energia: 15 },
    impacto: { extincaoEspecies: 8, desmatamento: 5 },
    descricao: 'Muita energia, mas impacta ecossistemas aquáticos',
    tipo: 'neutro'
  },
  {
    id: 'centrosReciclagem',
    nome: 'Centro de Reciclagem',
    custo: { dinheiro: 120, energia: 15 },
    producao: { ferro: 4, dinheiro: 8 },
    impacto: { poluicao: -8, aquecimentoGlobal: -2 },
    descricao: 'Reduz resíduos e recupera materiais',
    tipo: 'sustentavel'
  },
  {
    id: 'laboratorios',
    nome: 'Laboratório de Pesquisa',
    custo: { dinheiro: 300, energia: 25, ferro: 20 },
    producao: { dinheiro: 25 },
    impacto: { poluicao: -10, aquecimentoGlobal: -5 },
    descricao: 'Desenvolve tecnologias sustentáveis',
    tipo: 'sustentavel'
  },
  {
    id: 'parquesNacionais',
    nome: 'Parque Nacional',
    custo: { dinheiro: 200, madeira: 10 },
    producao: { carbono: 12 },
    impacto: { extincaoEspecies: -15, desmatamento: -20, aquecimentoGlobal: -8 },
    descricao: 'Protege biodiversidade e absorve CO2',
    tipo: 'sustentavel'
  }
];
