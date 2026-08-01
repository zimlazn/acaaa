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
    this.stopBackgroundMusic();
    return false;
  }

  startBackgroundMusic() {
    this.isMusicPlaying = false;
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  getPlayingState(): boolean {
    return false;
  }
}

export const soundFx = new SoundEffectsManager();
