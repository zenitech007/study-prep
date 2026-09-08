// Web Speech API text-to-speech utility with Google Kore (Nigerian English) detection
// and graceful fallback for distance learners.

export interface SpeechState {
  isSpeaking: boolean;
  currentId: string | null;
  voiceName: string;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private isSpeakingState: boolean = false;
  private currentIdState: string | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<(state: SpeechState) => void> = new Set();
  private voicesCache: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
    }
  }

  private initVoices() {
    if (!this.synth) return;

    const loadVoices = () => {
      this.voicesCache = this.synth?.getVoices() || [];
      this.selectedVoice = this.findBestVoice(this.voicesCache);
      this.notify();
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'onvoiceschanged' in this.synth) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Find the most suitable English voice:
   * 1. Strict English filter: ONLY includes voices where voice.lang starts with 'en'.
   * 2. Female voice heuristic: Search English voices for known female voice names:
   *    'female', 'samantha', 'victoria', 'zira', 'kore', 'karen', 'moira'.
   * 3. Safe fallback: Falls back to the first available English voice in the filtered array.
   *    Never falls back to a non-English voice.
   */
  public findBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;

    // 1. Strict English filter: ONLY include voices where voice.lang starts with 'en'
    const englishVoices = voices.filter(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith('en')
    );

    if (englishVoices.length === 0) {
      return null;
    }

    // 2. Female voice heuristic: known female voice keywords (case-insensitive)
    const femaleKeywords = [
      'female',
      'samantha',
      'victoria',
      'zira',
      'kore',
      'karen',
      'moira',
    ];

    // Check for Google Kore / Kore first among English voices
    const koreVoice = englishVoices.find((v) => {
      const name = v.name.toLowerCase();
      return name.includes('kore') && !name.includes('korean');
    });
    if (koreVoice) return koreVoice;

    // Search the filtered English voices for any matching female voice name
    const femaleVoice = englishVoices.find((v) => {
      const name = v.name.toLowerCase();
      if (name.includes('korean')) return false;
      return femaleKeywords.some((keyword) => name.includes(keyword));
    });
    if (femaleVoice) return femaleVoice;

    // 3. Safe fallback: very first available English voice in the filtered array
    return englishVoices[0];
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public getState(): SpeechState {
    return {
      isSpeaking: this.isSpeakingState,
      currentId: this.currentIdState,
      voiceName: this.selectedVoice ? this.selectedVoice.name : 'English (Default)',
    };
  }

  public subscribe(listener: (state: SpeechState) => void): () => void {
    this.listeners.add(listener);
    // Notify immediately on subscribe with current state
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  /**
   * Speak text associated with an identifiable block ID.
   */
  public play(id: string, text: string, onEnd?: () => void): void {
    if (!this.synth) return;

    // Stop any existing speech
    this.synth.cancel();

    // Clean text for natural speech (remove markdown symbols, underscores)
    const cleanText = text
      .replace(/_{2,}/g, 'blank')
      .replace(/[*#>`~]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    // Ensure voices are loaded
    if (!this.selectedVoice) {
      this.voicesCache = this.synth.getVoices();
      this.selectedVoice = this.findBestVoice(this.voicesCache);
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.93; // Deliberate, clear pace for medical clinical content
    utterance.pitch = 1.0;

    // Explicitly enforce English language on the utterance
    utterance.lang = 'en-US';

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      if (this.selectedVoice.lang && this.selectedVoice.lang.toLowerCase().replace('_', '-').startsWith('en')) {
        utterance.lang = this.selectedVoice.lang;
      }
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      this.currentIdState = id;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentIdState = null;
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Ignored if caused by explicit cancellation
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('TTS playback error:', e.error);
      }
      this.isSpeakingState = false;
      this.currentIdState = null;
      this.notify();
    };

    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentIdState = null;
      this.notify();
    }
  }

  /**
   * Toggle speech for a given block ID.
   * If currently playing this block, stops it.
   * If playing a different block or idle, starts this block.
   */
  public toggle(id: string, text: string): void {
    if (this.isSpeakingState && this.currentIdState === id) {
      this.stop();
    } else {
      this.play(id, text);
    }
  }

  public getVoiceDescription(): string {
    if (!this.selectedVoice) return 'English Voice';
    const name = this.selectedVoice.name;
    if (name.toLowerCase().includes('kore')) return 'Google Kore (Nigerian English)';
    if (this.selectedVoice.lang.toLowerCase().includes('ng')) return 'Nigerian English (en-NG)';
    return `${name} (${this.selectedVoice.lang})`;
  }
}

export const speechService = new SpeechService();
