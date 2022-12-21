import Image from "next/image";
import ReactSlider from "react-slider";
import {MixerSlider} from "./MixerSlider";
import { useState } from "react"

export const Waveform = () => {
  const [mixerLevel, setMixerLevel] = useState(100);
  return (
    <div className="h-1/3 bg-gray-900 flex flex-row">
      <div className="basis-3/4 relative">
        <canvas className={"w-full h-full"}>

        </canvas>
      </div>
      <div className="bg-gray-800 basis-1/4 flex flex-row p-3">
        <div className={"basis-1/5 bg-gray-700 rounded-xl flex"}>
          <MixerSlider mixerLevel={mixerLevel} setMixerLevel={setMixerLevel} />
        </div>
      </div>
    </div>
  )
}