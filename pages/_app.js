import "../styles/globals.css"
import { Header } from "../components/Header"
import { Waveform } from "../components/Waveform"
import * as Tone from "tone"
import store from "../store"
import { Provider, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { SequencedLeadSynth } from "../components/instruments/SequencedLeadSynth"
import { DrumKit } from "../components/instruments/DrumKit"

// eslint-disable-next-line import/no-anonymous-default-export,react/display-name
export default () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    )
}

export const Devices = () => {
    const devices = useSelector((state) => state.devices)
    return (
        <div className="h-2/3 bg-gray-900 flex flex-row">
            {devices.map((device) => {
                switch (device.instrument) {
                    case "SequencedLeadSynth":
                        return (
                            <SequencedLeadSynth
                                instrumentId={device.id}
                                username={device.username}
                                bgColor={device.bgColor}
                                name={device.name}
                                key={device.id}
                            />
                        )
                    case "DrumKit":
                        return (
                            <DrumKit
                                instrumentId={device.id}
                                username={device.username}
                                bgColor={device.bgColor}
                                name={device.name}
                                key={device.id}
                            />
                        )
                }
            })}
        </div>
    )
}
const Main = () => {
    // When audio is set up, we can start the app
    const [audioReady, setAudioReady] = useState(false)

    return (
        <div className="h-screen flex flex-col bg-gray-800">
            {audioReady && (
                <>
                    <Header />
                    <div className="h-full">
                        <Waveform />
                        <Devices />
                    </div>
                </>
            )}
            {!audioReady && (
                <div className={"m-auto p-15 flex flex-col justify-center"}>
                    <p className={"text-3xl"}>Welcome to Audix!</p>
                    <button
                        className={
                            "bg-blue-500 p-2 rounded-lg w-1/3 mt-5 mx-auto"
                        }
                        onClick={() =>
                            Tone.start().then(() => {
                                setAudioReady(true)
                            })
                        }
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    )
}
