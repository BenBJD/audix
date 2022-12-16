import "../styles/globals.css"
import {Header} from "../components/header";
import {Waveform} from "../components/waveform";
import {ConnectedDevices} from "../components/connectedDevices";

export default () => {
  return (
    <div className="h-screen flex flex-col bg-slate-800">
      <Header />
      <div className="h-full flex flex-col">
        <Waveform />
        <ConnectedDevices />
      </div>
    </div>
  )
}