import { Howl } from 'howler';

type SoundName = 'click' | 'hover' | 'success' | 'soft';

interface SoundEntry {
  howl: Howl;
  volume: number;
}

const DATA_URI_SOUNDS: Record<SoundName, string> = {
  click: makeBlip(660, 0.08, 'square', 0.04),
  hover: makeBlip(880, 0.05, 'sine', 0.02),
  success: makeArpeggio([523.25, 659.25, 783.99], 0.09, 'triangle', 0.05),
  soft: makeBlip(440, 0.12, 'sine', 0.04),
};

function makeBlip(
  freq: number,
  duration: number,
  type: OscillatorType,
  release: number
): string {
  const sampleRate = 44100;
  const length = Math.ceil(sampleRate * (duration + release));
  const buffer = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const env = t < duration ? 1 : Math.max(0, 1 - (t - duration) / release);
    const w =
      type === 'square'
        ? Math.sign(Math.sin(2 * Math.PI * freq * t))
        : type === 'triangle'
        ? 2 * Math.abs(2 * (freq * t - Math.floor(freq * t + 0.5))) - 1
        : Math.sin(2 * Math.PI * freq * t);
    buffer[i] = w * env * 0.3;
  }
  return encodeWav(buffer, sampleRate);
}

function makeArpeggio(
  freqs: number[],
  step: number,
  type: OscillatorType,
  release: number
): string {
  const sampleRate = 44100;
  const totalDuration = freqs.length * step + release;
  const length = Math.ceil(sampleRate * totalDuration);
  const buffer = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const noteIndex = Math.min(Math.floor(t / step), freqs.length - 1);
    const localT = t - noteIndex * step;
    const env =
      localT < step ? Math.min(1, localT * 40) : Math.max(0, 1 - (localT - step) / release);
    const freq = freqs[noteIndex];
    const w =
      type === 'triangle'
        ? 2 * Math.abs(2 * (freq * t - Math.floor(freq * t + 0.5))) - 1
        : Math.sin(2 * Math.PI * freq * t);
    buffer[i] = w * env * 0.3;
  }
  return encodeWav(buffer, sampleRate);
}

function encodeWav(samples: Float32Array, sampleRate: number): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return `data:audio/wav;base64;${btoa(binary)}`;
}

class SoundManager {
  private entries: Partial<Record<SoundName, SoundEntry>> = {};
  private enabled = true;
  private effectsVolume = 0.7;
  private unlocked = false;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setEffectsVolume(volume: number) {
    this.effectsVolume = Math.max(0, Math.min(1, volume));
    Object.values(this.entries).forEach((entry) => {
      if (entry) entry.howl.volume(entry.volume * this.effectsVolume);
    });
  }

  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    try {
      Howler.autoUnlock = true;
      Howler.ctx?.resume();
    } catch {
      /* noop */
    }
  }

  private ensure(name: SoundName): SoundEntry | undefined {
    if (this.entries[name]) return this.entries[name];
    const uri = DATA_URI_SOUNDS[name];
    if (!uri) return undefined;
    const howl = new Howl({ src: [uri], volume: 0.6 });
    const entry: SoundEntry = { howl, volume: 0.6 };
    this.entries[name] = entry;
    return entry;
  }

  play(name: SoundName) {
    if (!this.enabled) return;
    const entry = this.ensure(name);
    if (!entry) return;
    entry.howl.volume(entry.volume * this.effectsVolume);
    entry.howl.play();
  }
}

export const soundManager = new SoundManager();
export type { SoundName };
