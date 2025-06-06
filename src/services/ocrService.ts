
import { createWorker } from 'tesseract.js';

export class OCRService {
  private worker: any = null;
  
  async inicializar(): Promise<void> {
    if (this.worker) return;
    
    console.log('Inicializando OCR...');
    this.worker = await createWorker(['por', 'eng']);
    console.log('OCR inicializado com sucesso');
  }
  
  async reconhecerTexto(imageData: string | File | Blob): Promise<string> {
    try {
      await this.inicializar();
      
      console.log('Iniciando reconhecimento de texto...');
      const { data: { text } } = await this.worker.recognize(imageData);
      console.log('Texto reconhecido:', text);
      
      return text;
    } catch (error) {
      console.error('Erro no reconhecimento OCR:', error);
      throw new Error('Falha no reconhecimento de texto');
    }
  }
  
  async finalizar(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

export const ocrService = new OCRService();
