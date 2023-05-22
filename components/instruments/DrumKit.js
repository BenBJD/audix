import { useDispatch, useSelector } from "react-redux"
import * as Tone from "tone"
import { useEffect } from "react"
import { setInstrumentControl } from "../../slices/devicesSlice"
import { MixerSlider } from "../MixerSlider"
import { SequencerToggleButton } from "../Buttons"
import { DeviceEffect } from "../effects/DeviceEffect"
import { DeviceHeader } from "../Devices"

export const DrumKit = (props) => {
    const { level, pan, attack, decay, sustain, release } = useSelector(
        (state) => {
            return state.devices.find((d) => d.id === props.instrumentId)
        }
    ).controls

    const dispatch = useDispatch()

    // TODO: FX

    // Polyphonic steps
    // Objects are used instead of sub-arrays because of how Tone.js handles
    const steps = useSelector((state) => {
        return state.sequencers.find(
            (s) => s.instrumentId === props.instrumentId
        ).steps
    })

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
        "16n"
    )

    // Handle volume changes
    useEffect(() => {
        channel.volume.value = Tone.gainToDb(level / 100)
    }, [level])

    const setDeviceLevel = (newLevel) => {
        dispatch(
            setInstrumentControl({
                id: props.id,
                control: "level",
                value: newLevel,
            })
        )
    }

    return (
        <div className={props.bgColor + " basis-1/4 flex flex-col p-3 gap-3"}>
            <DeviceHeader username={props.username} channel={channel} />
            <div className="basis-11/12 w-full flex flex-row gap-3">
                <div className="bg-gray-700 basis-1/5 rounded-xl flex flex-row">
                    <MixerSlider
                        setMixerLevel={setDeviceLevel}
                        mixerLevel={level}
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
