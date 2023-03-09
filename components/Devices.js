import { MixerSlider } from "./MixerSlider"
import { useEffect, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import * as Tone from "tone"
import { usePolySequencerSteps, useSequencerSteps } from "../hooks/sequencers"

const MuteButton = (props) => {
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

const DeviceHeader = (props) => {
    return (
        <div className="basis-1/12 bg-gray-800 rounded-xl flex flex-row p-2 justify-between">
            <div className="basis-1/3 flex">
                <p className="text-lg m-auto text-gray-200">{props.username}</p>
            </div>
            <div className="flex flex-row basis-1/4 gap-2">
                <MuteButton channel={props.channel} />
            </div>
        </div>
    )
}

// non-functional
const DeviceEffect = (props) => {
    return (
        <li className={"h-1/6 pb-2"}>
            <div
                className={
                    "h-full flex flex-row p-1 gap-1 rounded-xl bg-gray-600"
                }
            >
                <div className={"w-1/5 m-auto flex justify-center"}>
                    <button className={"bg-red-700 w-5 h-5 rounded-full"} />
                </div>
                <div className={"w-3/5 m-auto"}>
                    <p className={"text-gray-200 text-center"}>LP Filter</p>
                </div>
                <button className={"w-1/5 m-auto"}>
                    <XMarkIcon className={"h-7 h-7 hover:text-red-700"} />
                </button>
            </div>
        </li>
    )
}

const SequencerToggleButton = (props) => {
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

const SequencedLeadSynth = (props) => {
    // Device controls
    const [deviceLevel, setDeviceLevel] = useState(100)
    const [devicePan, setDevicePan] = useState(0)

    // Instrument controls
    const [waveform, setWaveform] = useState("triangle")
    const [attack, setAttack] = useState(0.01)
    const [decay, setDecay] = useState(0.2)
    const [sustain, setSustain] = useState(0.5)
    const [release, setRelease] = useState(0.01)

    // TODO: FX

    // TODO: Do this properly with useSequencerSteps
    // Seven nation army bass line
    const [stepDivision, setStepDivision] = useState("16n")
    const [steps, stepsDispatch] = useSequencerSteps([
        // bar 1
        { note: "E3", velocity: 0.5, duration: "8n" },
        null,
        null,
        null,
        // 2
        null,
        null,
        { note: "E3", velocity: 0.5, duration: "8n" },
        null,
        // 3
        { note: "G3", velocity: 0.5, duration: "8n" },
        null,
        null,
        { note: "E3", velocity: 0.5, duration: "8n" },
        // 4
        null,
        null,
        { note: "D3", velocity: 0.5, duration: "8n" },
        null,
        // 5
        { note: "C3", velocity: 0.5, duration: "2n" },
        null,
        null,
        null,
        // 6
        null,
        null,
        null,
        null,
        // 7
        { note: "B2", velocity: 0.5, duration: "2n" },
        null,
        null,
        null,
        // 8
        null,
        null,
        null,
        null,
    ])

    // Create the instrument
    const instrumentDevice = new Tone.Synth({
        oscillator: {
            type: waveform,
        },
        envelope: {
            attack: attack,
            decay: decay,
            sustain: sustain,
            release: release,
        },
    })

    // TODO: Add a way to add effects
    const channel = new Tone.Channel()
    instrumentDevice.chain(channel, Tone.Destination)

    // Create the sequencer
    const sequencer = new Tone.Sequence(
        (time, step) => {
            if (step) {
                instrumentDevice.triggerAttackRelease(
                    step.note,
                    step.duration,
                    time,
                    step.velocity
                )
            }
        },
        steps,
        stepDivision
    )

    // Handle volume changes
    useEffect(() => {
        channel.volume.setValueAtTime(
            Tone.gainToDb(deviceLevel / 100),
            Tone.now()
        )
    }, [deviceLevel])

    return (
        <div className={props.bgColor + " basis-1/4 flex flex-col p-3 gap-3"}>
            <DeviceHeader username={props.username} channel={channel} />
            <div className="basis-11/12 w-full flex flex-row gap-3">
                <div className="bg-gray-700 basis-1/5 rounded-xl flex flex-row">
                    <MixerSlider
                        setMixerLevel={setDeviceLevel}
                        mixerLevel={deviceLevel}
                    />
                </div>
                <div className="basis-4/5 rounded-xl flex flex-col gap-3">
                    <div className={"basis-1/12 rounded-xl p-3 bg-gray-800"}>
                        <div className={"flex flex-row justify-between"}>
                            <h3 className={"text-gray-200 text-lg"}>
                                {props.name.charAt(0).toUpperCase() +
                                    props.name.substring(1)}
                            </h3>
                            <SequencerToggleButton sequencer={sequencer} />
                        </div>
                    </div>
                    <div className={"basis-11/12 rounded-xl p-3 bg-gray-700"}>
                        <p className={"text-gray-200 text-center h-1/12"}>
                            Effects
                        </p>
                        <ul className={"flex flex-col h-max"}>
                            <DeviceEffect />
                            <DeviceEffect />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DrumKit = (props) => {
    // Device controls
    const [deviceLevel, setDeviceLevel] = useState(100)
    const [devicePan, setDevicePan] = useState(0)

    // Instrument controls
    const [attack, setAttack] = useState(0.01)
    const [decay, setDecay] = useState(0.2)
    const [sustain, setSustain] = useState(0.5)
    const [release, setRelease] = useState(0.01)

    // TODO: FX

    // TODO: Do this properly with useSequencerSteps
    const [stepDivision, setStepDivision] = useState("16n")
    // C4 is kick
    // D4 is snare
    // E4 is closed hat
    // F4 is open hat
    // G4 is clap
    // A4 is crash
    // B4 is ride
    // C5 is tom
    // D5 is tom
    // E5 is tom

    // Polyphonic steps
    // Objects are used instead of sub-arrays because of how Tone.js handles
    const [steps, stepsReducer] = usePolySequencerSteps([
        {
            notes: [
                { note: "C4", velocity: 0.5, duration: "8n" },
                { note: "E4", velocity: 0.5, duration: "8n" },
            ],
        },
        { notes: [] },
        { notes: [{ note: "E4", velocity: 0.5, duration: "8n" }] },
        { notes: [] },
        {
            notes: [
                { note: "D4", velocity: 0.5, duration: "8n" },
                { note: "E4", velocity: 0.5, duration: "8n" },
            ],
        },
        { notes: [] },
        { notes: [{ note: "E4", velocity: 0.5, duration: "8n" }] },
        { notes: [] },
    ])

    const instrumentDevice = new Tone.Sampler({
        urls: {
            C4: "808-Kicks01.wav",
            D4: "808-Snare01.wav",
            E4: "808-HiHats01.wav",
            F4: "808-OpenHiHats01.wav",
            G4: "808-Clap01.wav",
            A4: "",
            B4: "808-Ride1.wav",
            C5: "",
            D5: "",
            E5: "",
        },
        controls: {
            attack: attack,
            decay: decay,
            sustain: sustain,
            release: release,
        },
        baseUrl: "http://127.0.0.1:8000/",
    })

    // // Polyphony
    // const instrumentDevice = new Tone.PolySynth(kit)
    // instrumentDevice.maxPolyphony = 4

    // TODO: Add a way to add effects
    const channel = new Tone.Channel()
    instrumentDevice.chain(channel, Tone.Destination)

    // Create the polyphonic sequencer
    const sequencer = new Tone.Sequence(
        (time, step) => {
            if (step.notes.length > 0) {
                // loop over steps in each step
                step.notes.forEach((note) => {
                    instrumentDevice.triggerAttackRelease(
                        note.note,
                        note.duration,
                        time,
                        note.velocity
                    )
                })
            }
        },
        steps,
        stepDivision
    )

    // Handle volume changes
    useEffect(() => {
        channel.volume.setValueAtTime(
            Tone.gainToDb(deviceLevel / 100),
            Tone.now()
        )
    }, [deviceLevel])

    return (
        <div className={props.bgColor + " basis-1/4 flex flex-col p-3 gap-3"}>
            <DeviceHeader username={props.username} channel={channel} />
            <div className="basis-11/12 w-full flex flex-row gap-3">
                <div className="bg-gray-700 basis-1/5 rounded-xl flex flex-row">
                    <MixerSlider
                        setMixerLevel={setDeviceLevel}
                        mixerLevel={deviceLevel}
                    />
                </div>
                <div className="basis-4/5 rounded-xl flex flex-col gap-3">
                    <div className={"basis-1/12 rounded-xl p-3 bg-gray-800"}>
                        <div className={"flex flex-row justify-between"}>
                            <h3 className={"text-gray-200 text-lg"}>
                                {props.name.charAt(0).toUpperCase() +
                                    props.name.substring(1)}
                            </h3>
                            <SequencerToggleButton sequencer={sequencer} />
                        </div>
                    </div>
                    <div className={"basis-11/12 rounded-xl p-3 bg-gray-700"}>
                        <p className={"text-gray-200 text-center h-1/12"}>
                            Effects
                        </p>
                        <ul className={"flex flex-col h-max"}>
                            <DeviceEffect />
                            <DeviceEffect />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Devices = () => {
    return (
        <div className="h-2/3 bg-gray-900 flex flex-row">
            <SequencedLeadSynth
                instrumentId={0}
                username={"Ben"}
                bgColor={"bg-yellow-700"}
                name={"Bass Synth"}
            />
            <SequencedLeadSynth
                instrumentId={1}
                username={"Not Ben"}
                bgColor={"bg-red-700"}
                name={"Lead Synth"}
            />
            <DrumKit
                instrumentId={2}
                username={"Still Not Ben"}
                bgColor={"bg-blue-700"}
                name={"Drum"}
            />
        </div>
    )
}
