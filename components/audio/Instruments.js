import * as Tone from "tone"
import { useEffect, useState } from "react"

export const useDrums = () => {
  const [drums, setDrums] = useState("")

  useEffect(() => {
    setDrums(new Tone.Sampler({
      urls: {
        "A4": "kick.wav",
        "B4": "snare.wav",
        "C4": "high-hat.wav",
        "D4": "high-hat-open.wav",
        "E4": "tom1.wav",
        "F4": "tom2.wav",
        "G4": "tom3.wav",
      },
      release: 1,
      baseUrl: "",
    }))
  }, [])

  return drums
}