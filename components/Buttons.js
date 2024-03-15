import { useState } from "react"
import * as Tone from "tone"

export const MuteButton = (props) => {
    const [deviceMute, setDeviceMute] = useState(false)

    const toggleMute = () => {
        if (deviceMute) {
            props.channel.mute = false
            setDeviceMute(false)
        } else {
            props.channel.mute = true
            setDeviceMute(true)
        }
    }

    if (deviceMute) {
        return (
            <button
                onClick={toggleMute}
                className="basis-1/2 bg-blue-700 rounded-full justify-center flex"
            >
                <p className="text-xl m-auto text-gray-200">M</p>
            </button>
        )
    } else {
        return (
            <button
                onClick={toggleMute}
                className="basis-1/2 rounded-full justify-center flex"
            >
                <p className="text-xl m-auto text-gray-200">M</p>
            </button>
        )
    }
}
export const SequencerToggleButton = (props) => {
    const [sequencerStarted, setSequencerStarted] = useState(false)

    const handleToggleSequencer = () => {
        if (sequencerStarted) {
            props.sequencer.stop()
            setSequencerStarted(false)
        } else {
            // start in the next bar
            props.sequencer.start(
                parseInt(Tone.Transport.position.split(":")[0]) + 1 + ":0:0"
            )
            setSequencerStarted(true)
        }
    }

    if (sequencerStarted) {
        return (
            <button
                onClick={handleToggleSequencer}
                className="basis-1/3 bg-green-700 rounded-full justify-center flex"
            >
                <p className="text-md m-auto text-gray-200">Started</p>
            </button>
        )
    } else {
        return (
            <button
                onClick={handleToggleSequencer}
                className="basis-1/3 bg-red-700 rounded-full justify-center flex"
            >
                <p className="text-md m-auto text-gray-200">Stopped</p>
            </button>
        )
    }
}