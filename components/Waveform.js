import { MixerSlider } from "./MixerSlider"
import { useEffect, useState, useContext, createContext } from "react"
import * as Tone from "tone"
import dynamic from "next/dynamic"

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
})

const MasterControls = (props) => {
    const FXContext = createContext([])
    const [mixerLevel, setMixerLevel] = useState(100)
    const [LPF, setLPF] = useState(20000)

    // Handle volume change
    useEffect(() => {
        Tone.Destination.volume.value = Tone.gainToDb(mixerLevel / 100)
    }, [mixerLevel])

    const filter = new Tone.Filter(500, "lowpass")

    // Handle LPF change
    useEffect(() => {
        filter.set({ frequency: LPF })
    }, [LPF])

    return (
        <div className="bg-gray-800 basis-1/4 flex flex-row p-3">
            <div className={"basis-1/5 bg-gray-700 rounded-xl flex"}>
                <MixerSlider
                    mixerLevel={mixerLevel}
                    setMixerLevel={setMixerLevel}
                />
                <MixerSlider mixerLevel={LPF} setMixerLevel={setLPF} />
            </div>
        </div>
    )
}

export const Waveform = () => {
    const [mixerLevel, setMixerLevel] = useState(100)
    let waveform
    let w
    let h
    function setup(p5, canvasParentRef) {
        w = document.getElementById("canvasDiv").offsetWidth
        h = document.getElementById("canvasDiv").offsetHeight
        p5.createCanvas(w, h).parent(canvasParentRef)
        p5.noFill()
        waveform = new Tone.Analyser("fft", 512)
        waveform.smoothing = 0.7
        Tone.Destination.connect(waveform)
    }

    function draw(p5) {
        p5.stroke(255)
        p5.strokeWeight(2)
        p5.background("#000")

        if (Tone.Transport.state === "started") {
            p5.beginShape()
            const spectrum = waveform.getValue()
            for (let i = 0; i < spectrum.length; i++) {
                p5.vertex(
                    p5.map(i, 0, spectrum.length, 0, w),
                    p5.map(spectrum[i], -200, 0, h, 0)
                )
            }
            p5.endShape()
        }
    }

    return (
        <div className="h-1/3 bg-gray-900 flex flex-row">
            <div id={"canvasDiv"} className="basis-3/4 relative">
                <Sketch
                    className={"h-full w-full"}
                    setup={setup}
                    draw={draw}
                ></Sketch>
            </div>
            <MasterControls />
        </div>
    )
}
