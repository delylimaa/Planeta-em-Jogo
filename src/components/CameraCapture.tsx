
import React, { useRef, useCallback, useState } from 'react';
import { Camera, CameraOff, Capture } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  isProcessing: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, isProcessing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  const iniciarCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Câmera traseira no mobile
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  }, []);

  const pararCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  }, [stream]);

  const capturarImagem = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Configurar tamanho do canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenhar frame atual do vídeo no canvas
    ctx.drawImage(video, 0, 0);

    // Converter para base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    onCapture(imageData);
  }, [onCapture]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Captura de Medicamento</h3>
          
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {isActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
            )}
            
            {/* Overlay com guias */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 border-2 border-red-500 rounded-full bg-red-500/20"></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            {!isActive ? (
              <Button onClick={iniciarCamera} className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Iniciar Câmera
              </Button>
            ) : (
              <>
                <Button
                  onClick={capturarImagem}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  <Capture className="w-4 h-4" />
                  {isProcessing ? 'Processando...' : 'Capturar'}
                </Button>
                <Button
                  onClick={pararCamera}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CameraOff className="w-4 h-4" />
                  Parar
                </Button>
              </>
            )}
          </div>

          <p className="text-sm text-gray-600">
            Posicione o medicamento (cartela, caixa ou bula) dentro da área destacada
          </p>
        </div>

        {/* Canvas oculto para captura */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};
