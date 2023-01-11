import * as Tone from "tone"
import hihat_closed from "../../public/samples/hihat_closed.wav"
import hihat_open from "../../public/samples/hihat_open.wav"
import kick from "../../public/samples/kick.wav"
import snare from "../../public/samples/snare.wav"
import tom1 from "../../public/samples/tom1.wav"
import tom2 from "../../public/samples/tom2.wav"
import tom3 from "../../public/samples/tom3.wav"

export const drumSampler = (preset, release) => {
  switch (preset) {
    case "rock": {
      return new Tone.Sampler({
        urls: {
          "A4": "kick.wav",
          "B4": "snare.wav",
          "C4": "hihat_closed.wav",
          "D4": "hihat_open.wav",
          "E4": "tom1.wav",
          "F4": "tom2.wav",
          "G4": "tom3.wav",
        },
        release: release,
        baseUrl: "/samples/",
      }).toDestination()
    }
    default: {
      return "error"
    }
  }
}

export const leadSynth = (waveform, attack, decay, sustain, release) => {
  return new Tone.Synth({
    oscillator: {
      type: waveform,
    },
    envelope: {
      attack: attack,
      decay: decay,
      sustain: sustain,
      release: release,
    },
  }).toDestination()
}
