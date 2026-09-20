// Web Audio API & Background Music Controller for Flores Amarillas
import { DEDICATION_CONFIG } from '../config';

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasUserInteracted: boolean;
  songTitle: string;
  artist: string;
}

type AudioListener = (state: AudioState) => void;

class SoundController {
  private ctx: AudioContext | null = null;
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private volume: number = 0.7;
  private hasUserInteracted: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private interactionListenersAttached: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedMute = localStorage.getItem('flores_amarillas_muted');
        if (storedMute !== null) {
          this.isMuted = storedMute === 'true';
        }
        const storedVolume = localStorage.getItem('flores_amarillas_volume');
        if (storedVolume !== null) {
          const v = parseFloat(storedVolume);
          if (!isNaN(v) && v >= 0 && v <= 1) {
            this.volume = v;
          }
        }
      } catch (e) {
        console.warn('LocalStorage error in SoundController:', e);
      }

      this.initAudioElement();
      this.attachFirstInteractionListener();
    }
  }

  private initAudioElement() {
    if (typeof window === 'undefined') return;

    try {
      const musicConfig = DEDICATION_CONFIG.music;
      this.audio = new Audio(musicConfig.src);
      this.audio.loop = musicConfig.loop ?? true;
      this.audio.volume = this.isMuted ? 0 : (musicConfig.defaultVolume ?? this.volume);
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio element error, will fallback if available:', e);
        this.isPlaying = false;
        this.notifyListeners();
      });
    } catch (err) {
      console.warn('Failed to initialize Audio element:', err);
    }
  }

  private attachFirstInteractionListener() {
    if (this.interactionListenersAttached || typeof window === 'undefined') return;
    this.interactionListenersAttached = true;

    const handleFirstInteraction = () => {
      this.hasUserInteracted = true;
      this.removeFirstInteractionListener();

      // Resume Web Audio context if suspended
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      // Auto-start music on first user touch / click if not muted
      if (DEDICATION_CONFIG.music.autoplayOnInteraction && !this.isMuted && !this.isPlaying) {
        this.playMusic().catch(() => {});
      } else {
        this.notifyListeners();
      }
    };

    const options = { once: true, passive: true };
    window.addEventListener('click', handleFirstInteraction, options);
    window.addEventListener('touchstart', handleFirstInteraction, options);
    window.addEventListener('keydown', handleFirstInteraction, options);

    this.removeInteractionListenersFn = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }

  private removeInteractionListenersFn: (() => void) | null = null;

  private removeFirstInteractionListener() {
    if (this.removeInteractionListenersFn) {
      this.removeInteractionListenersFn();
      this.removeInteractionListenersFn = null;
    }
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Audio listener error:', err);
      }
    });
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      hasUserInteracted: this.hasUserInteracted,
      songTitle: DEDICATION_CONFIG.music.title,
      artist: DEDICATION_CONFIG.music.artist,
    };
  }

  public async playMusic(): Promise<boolean> {
    if (!this.audio) {
      this.initAudioElement();
    }
    if (!this.audio) return false;

    this.hasUserInteracted = true;
    this.initContext();

    try {
      this.audio.volume = this.isMuted ? 0 : this.volume;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isPlaying = true;
        this.notifyListeners();
        return true;
      }
    } catch (err) {
      console.warn('Autoplay blocked or playback error:', err);
      this.isPlaying = false;
      this.notifyListeners();
      return false;
    }
    return false;
  }

  public pauseMusic(): void {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  public async togglePlay(): Promise<boolean> {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      if (this.isMuted) {
        this.setMuted(false);
      }
      return await this.playMusic();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      localStorage.setItem('flores_amarillas_muted', String(this.isMuted));
    } catch (e) {
      console.warn(e);
    }

    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.isMuted ? 0 : this.volume;
      if (!this.isMuted && !this.isPlaying && this.hasUserInteracted) {
        this.playMusic().catch(() => {});
      }
    }

    this.notifyListeners();
  }

  public setVolume(volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    this.volume = clamped;
    try {
      localStorage.setItem('flores_amarillas_volume', String(clamped));
    } catch (e) {
      console.warn(e);
    }

    if (this.audio) {
      if (!this.isMuted) {
        this.audio.volume = clamped;
      }
    }
    this.notifyListeners();
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Plays a delicate, romantic blooming arpeggio in E Major 9 (E4, B4, E5, G#5, B5, D#6, E6)
   * Using soft sine + triangle harmonics with exponential decay resembling a magical music box / celestial chime.
   */
  public playBloomChord() {
    if (this.isMuted) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Romantic chord notes in Hz (E Major 9 / Add9 warmth)
      const frequencies = [
        329.63, // E4
        493.88, // B4
        659.25, // E5
        830.61, // G#5
        987.77, // B5
        1244.51, // D#6
        1318.51, // E6
      ];

      // Master warm low-pass filter
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.setValueAtTime(2800, now);
      masterFilter.Q.setValueAtTime(1.2, now);
      masterFilter.connect(this.ctx.destination);

      frequencies.forEach((freq, index) => {
        if (!this.ctx) return;
        const noteStartTime = now + index * 0.085; // Staggered arpeggio
        const duration = 2.4;

        // Primary fundamental oscillator (pure sine)
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, noteStartTime);

        // Overtone harmonic oscillator (triangle for chime bell sparkle)
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2.002, noteStartTime);

        // Gain Envelope
        const noteGain = this.ctx.createGain();
        const baseGain = 0.08 / (index * 0.15 + 1);

        noteGain.gain.setValueAtTime(0.0001, noteStartTime);
        noteGain.gain.exponentialRampToValueAtTime(baseGain, noteStartTime + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + duration);

        const osc2Gain = this.ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.02, noteStartTime);
        osc2Gain.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + duration * 0.6);

        osc1.connect(noteGain);
        osc2.connect(osc2Gain);
        osc2Gain.connect(noteGain);

        noteGain.connect(masterFilter);

        osc1.start(noteStartTime);
        osc1.stop(noteStartTime + duration);
        osc2.start(noteStartTime);
        osc2.stop(noteStartTime + duration);
      });
    } catch (err) {
      console.warn('Audio play error:', err);
    }
  }

  /**
   * Gentle soft click/tap sound for buttons
   */
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (err) {
      console.warn('Audio tap error:', err);
    }
  }
}

export const soundController = new SoundController();
