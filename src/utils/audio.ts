class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private musicOscillators: OscillatorNode[] = [];
  private musicGainNode: GainNode | null = null;
  private isMusicPlaying = false;
  private musicTimer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute pop sound when clicking envelope or buttons
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Sparkling cute harp chime for letter open & flower bloom
  playSparkleChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.06);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.06);
        osc.stop(this.ctx.currentTime + index * 0.06 + 0.4);
      });
    } catch {
      // Ignore if audio blocked
    }
  }

  // Warm sweet lofi background melody synth loop
  toggleBackgroundMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  startBackgroundMusic() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.isMusicPlaying = true;
      this.musicGainNode = this.ctx.createGain();
      this.musicGainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.musicGainNode.connect(this.ctx.destination);

      // Cute warm pentatonic tune sequence (C, D, E, G, A, C5)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      const melody = [0, 2, 4, 3, 2, 0, 4, 5, 4, 2, 3, 1, 0, 2, 4, 6];
      let step = 0;

      const playNextNote = () => {
        if (!this.isMusicPlaying || !this.ctx || !this.musicGainNode) return;

        const noteIndex = melody[step % melody.length];
        const freq = scale[noteIndex];

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        noteGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

        osc.connect(noteGain);
        noteGain.connect(this.musicGainNode);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.85);

        step++;
        this.musicTimer = window.setTimeout(playNextNote, 600);
      };

      playNextNote();
    } catch {
      this.isMusicPlaying = false;
    }
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  getPlayingState(): boolean {
    return this.isMusicPlaying;
  }
}

export const soundFx = new SoundEffectsManager();
