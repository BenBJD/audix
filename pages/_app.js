import "../styles/globals.css"
import { Header } from "../components/Header"
import { Waveform } from "../components/Waveform"
import { Devices } from "../components/Devices"
import * as Tone from "tone"
import store from "../store"
import { Provider, useDispatch, useSelector } from "react-redux"
import { createContext, useContext, useEffect, useState } from "react"

// eslint-disable-next-line import/no-anonymous-default-export,react/display-name
export default () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
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
