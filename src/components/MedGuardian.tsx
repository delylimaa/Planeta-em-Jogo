
import React, { useState } from 'react';
import { Shield, Camera, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CameraCapture } from './CameraCapture';
import { ResultadoMedicamento } from './ResultadoMedicamento';
import { ocrService } from '@/services/ocrService';
import { medicamentoService } from '@/services/medicamentoService';
import { ResultadoReconhecimento } from '@/types/medicamento';

type Tela = 'menu' | 'camera' | 'resultado';

export const MedGuardian: React.FC = () => {
  const [telaAtual, setTelaAtual] = useState<Tela>('menu');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultado, setResultado] = useState<ResultadoReconhecimento | null>(null);

  const processarImagem = async (imageData: string) => {
    setIsProcessing(true);
    
    try {
      console.log('Iniciando processamento da imagem...');
      
      // Converter base64 para blob
      const response = await fetch(imageData);
      const blob = await response.blob();
      
      // Reconhecer texto na imagem
      const textoReconhecido = await ocrService.reconhecerTexto(blob);
      console.log('Texto reconhecido:', textoReconhecido);
      
      // Buscar medicamento na base de dados
      const resultadoBusca = medicamentoService.buscarMedicamentoPorTexto(textoReconhecido);
      
      setResultado(resultadoBusca);
      setTelaAtual('resultado');
      
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      alert('Erro ao processar a imagem. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const voltarParaMenu = () => {
    setTelaAtual('menu');
    setResultado(null);
  };

  const irParaCamera = () => {
    setTelaAtual('camera');
  };

  if (telaAtual === 'camera') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <Button 
              onClick={voltarParaMenu} 
              variant="outline" 
              className="mb-4"
            >
              ← Voltar ao Menu
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              MedGuardian
            </h1>
            <p className="text-gray-600 mt-2">Capture a imagem do seu medicamento</p>
          </div>

          <CameraCapture 
            onCapture={processarImagem}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    );
  }

  if (telaAtual === 'resultado' && resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <Button 
              onClick={voltarParaMenu} 
              variant="outline" 
              className="mb-4"
            >
              ← Voltar ao Menu
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              MedGuardian
            </h1>
          </div>

          <ResultadoMedicamento 
            resultado={resultado}
            onNovaCaptura={irParaCamera}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Shield className="w-10 h-10 text-blue-600" />
            MedGuardian
          </h1>
          <p className="text-xl text-gray-600">
            Assistente Pessoal de Remédios com Visão Computacional
          </p>
          <p className="text-gray-500">
            Identifique medicamentos, receba alertas e garanta seu uso seguro
          </p>
        </div>

        {/* Cards de funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={irParaCamera}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-600">
                <Camera className="w-6 h-6" />
                Identificar Medicamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use a câmera para identificar comprimidos, caixas ou bulas de medicamentos
              </p>
              <Button className="w-full mt-4">
                Iniciar Identificação
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-600">
                <History className="w-6 h-6" />
                Histórico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Consulte o histórico de medicamentos identificados e uso registrado
              </p>
              <Button variant="outline" className="w-full mt-4" disabled>
                Em Breve
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-600">
                <Settings className="w-6 h-6" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ajuste preferências de voz, alertas e configurações de acessibilidade
              </p>
              <Button variant="outline" className="w-full mt-4" disabled>
                Em Breve
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Seção de benefícios */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Benefícios do MedGuardian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600">✓ Segurança</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Evita erros de medicação</li>
                <li>• Alerta sobre medicamentos vencidos</li>
                <li>• Identifica interações perigosas</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-600">✓ Acessibilidade</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Ideal para pessoas com deficiência visual</li>
                <li>• Leitura em voz alta das informações</li>
                <li>• Interface simples e intuitiva</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            ⚠️ Este sistema é uma ferramenta auxiliar. Sempre consulte profissionais de saúde 
            para orientações médicas definitivas.
          </p>
        </div>
      </div>
    </div>
  );
};
