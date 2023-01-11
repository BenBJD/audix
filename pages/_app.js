import "../styles/globals.css"
import {Header} from "../components/Header";
import {Waveform} from "../components/Waveform";
import {Mixer} from "../components/Mixer";
import * as Tone from "tone";
import store from "../store"
import {Provider} from "react-redux"
import { useEffect, useState } from "react"

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
            <Mixer />
          </div>
        </>
      )}
      {!audioReady && (
        <button onClick={() => Tone.start().then(() => {
          setAudioReady(true)
        })}>Start</button>
      )}
    </div>
  )
}