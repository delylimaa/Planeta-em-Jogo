
import { Medicamento } from '@/types/medicamento';

export const baseMedicamentos: Medicamento[] = [
  {
    id: '1',
    nome: 'Losartana',
    principioAtivo: 'Losartana Potássica',
    dose: '50mg',
    forma: 'comprimido',
    uso: 'Anti-hipertensivo',
    frequencia: 'Uma vez ao dia',
    contraindicacoes: ['Gravidez', 'Hipotensão severa'],
    interacoes: ['Ibuprofeno', 'Espironolactona', 'Lítio'],
    alertas: ['Não usar com anti-inflamatórios', 'Monitorar pressão arterial'],
    descricao: 'Medicamento para controle da pressão arterial'
  },
  {
    id: '2',
    nome: 'Metformina',
    principioAtivo: 'Cloridrato de Metformina',
    dose: '500mg',
    forma: 'comprimido',
    uso: 'Antidiabético',
    frequencia: 'Duas vezes ao dia',
    contraindicacoes: ['Insuficiência renal', 'Acidose metabólica'],
    interacoes: ['Álcool', 'Contraste iodado'],
    alertas: ['Tomar com alimentos', 'Monitorar função renal'],
    descricao: 'Medicamento para controle da diabetes tipo 2'
  },
  {
    id: '3',
    nome: 'Omeprazol',
    principioAtivo: 'Omeprazol',
    dose: '20mg',
    forma: 'capsula',
    uso: 'Protetor gástrico',
    frequencia: 'Uma vez ao dia em jejum',
    contraindicacoes: ['Hipersensibilidade ao omeprazol'],
    interacoes: ['Warfarina', 'Clopidogrel'],
    alertas: ['Tomar 30 minutos antes do café da manhã', 'Não mastigar a cápsula'],
    descricao: 'Medicamento para proteção do estômago'
  },
  {
    id: '4',
    nome: 'Paracetamol',
    principioAtivo: 'Paracetamol',
    dose: '500mg',
    forma: 'comprimido',
    uso: 'Analgésico e antitérmico',
    frequencia: 'A cada 6 horas se necessário',
    contraindicacoes: ['Doença hepática grave'],
    interacoes: ['Álcool', 'Warfarina'],
    alertas: ['Não exceder 4g por dia', 'Cuidado com outros medicamentos que contenham paracetamol'],
    descricao: 'Medicamento para dor e febre'
  },
  {
    id: '5',
    nome: 'Sinvastatina',
    principioAtivo: 'Sinvastatina',
    dose: '20mg',
    forma: 'comprimido',
    uso: 'Redutor de colesterol',
    frequencia: 'Uma vez ao dia à noite',
    contraindicacoes: ['Doença hepática ativa', 'Gravidez'],
    interacoes: ['Ciclosporina', 'Claritromicina', 'Suco de toranja'],
    alertas: ['Tomar à noite', 'Monitorar enzimas hepáticas'],
    descricao: 'Medicamento para controle do colesterol'
  }
];
