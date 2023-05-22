import { useDispatch, useSelector } from "react-redux"
import * as Tone from "tone"
import { useEffect } from "react"
import { setInstrumentControl } from "../../slices/devicesSlice"
import { MixerSlider } from "../MixerSlider"
import { SequencerToggleButton } from "../Buttons"
import { DeviceEffect } from "../effects/DeviceEffect"
import { DeviceHeader } from "../Devices"

export const SequencedLeadSynth = (props) => {
    const { level, pan, attack, decay, sustain, release, waveform } =
        useSelector((state) => {
            return state.devices.find((d) => d.id === props.instrumentId)
        }).controls
    // TODO: Handle creating state for instrument if not already created

    const dispatch = useDispatch()

    // TODO: FX

    const steps = useSelector((state) => {
        return state.sequencers.find(
            (s) => s.instrumentId === props.instrumentId
        ).steps
    })

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

    // Create sequencer
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
        channel.volume.setValueAtTime(Tone.gainToDb(level / 100), Tone.now())
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
