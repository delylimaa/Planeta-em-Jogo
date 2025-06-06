
export class VozService {
  private synth: SpeechSynthesis;
  private vozes: SpeechSynthesisVoice[] = [];
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.carregarVozes();
  }
  
  private carregarVozes() {
    this.vozes = this.synth.getVoices();
    
    if (this.vozes.length === 0) {
      // Aguardar carregamento das vozes
      this.synth.onvoiceschanged = () => {
        this.vozes = this.synth.getVozes();
      };
    }
  }
  
  falar(texto: string, velocidade: number = 0.8): void {
    if (!texto.trim()) return;
    
    // Interromper qualquer fala atual
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(texto);
    
    // Tentar usar voz em português
    const vozPortugues = this.vozes.find(voz => 
      voz.lang.includes('pt') || voz.lang.includes('br')
    );
    
    if (vozPortugues) {
      utterance.voice = vozPortugues;
    }
    
    utterance.rate = velocidade;
    utterance.volume = 0.9;
    utterance.pitch = 1;
    
    utterance.onerror = (event) => {
      console.error('Erro na síntese de voz:', event);
    };
    
    this.synth.speak(utterance);
  }
  
  pararFala(): void {
    this.synth.cancel();
  }
  
  estáFalando(): boolean {
    return this.synth.speaking;
  }
}

export const vozService = new VozService();
