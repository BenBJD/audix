import ReactSlider from 'react-slider'
import {MixerSlider} from "./MixerSlider";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { XMarkIcon } from "@heroicons/react/24/outline"

const SoloButton = props => {
  if (props.mixerSolo) {
    return(
      <button onClick={(e) => props.setMixerSolo(state => !state)}  className="basis-1/2 bg-red-700 rounded-full justify-center flex">
        <p className="text-xl m-auto text-gray-200">S</p>
      </button>
    )
  } else {
    return(
      <button onClick={(e) => props.setMixerSolo(state => !state)}  className="basis-1/2 rounded-full justify-center flex">
        <p className="text-xl m-auto text-gray-200">S</p>
      </button>
    )
  }
}

const MuteButton = props => {
  if (props.mixerMute) {
    return(
      <button onClick={(e) => props.setMixerMute(state => !state)}  className="basis-1/2 bg-blue-700 rounded-full justify-center flex">
        <p className="text-xl m-auto text-gray-200">M</p>
      </button>
    )
  } else {
    return(
      <button onClick={(e) => props.setMixerMute(state => !state)} className="basis-1/2 rounded-full justify-center flex">
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
        <SoloButton mixerSolo={props.mixerSolo} setMixerSolo={props.setMixerSolo}/>
        <MuteButton mixerMute={props.mixerMute} setMixerMute={props.setMixerMute}/>
      </div>
    </div>
  )
}

const DeviceEffect = props => {
  return (
    <li className={"h-1/6 pb-2"}>
      <div className={"h-full flex flex-row p-1 gap-1 rounded-xl bg-gray-600"}>
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

const DeviceEffects = (props) => {
  return (
    <div className={"basis-11/12 rounded-xl p-3 bg-gray-700"}>
      <p className={"text-gray-200 text-center h-1/12"}>{props.name}</p>
      <ul className={"flex flex-col h-max"}>
        <DeviceEffect />
      </ul>
    </div>
  )
}

const Device = (props) => {
  const [mixerLevel, setMixerLevel] = useState(100)
  const [mixerMute, setMixerMute] = useState(false)
  const [mixerSolo, setMixerSolo] = useState(false)
  const [instrument, setInstrument] = useState(props.instrument)
  return (
    <div className={props.bgColor + " basis-1/4 flex flex-col p-3 gap-3"}>
      <DeviceHeader
        username={props.username}
        mixerMute={mixerMute}
        setMixerMute={setMixerMute}
        mixerSolo={mixerSolo}
        setMixerSolo={setMixerSolo}
      />
      <div className="basis-11/12 w-full flex flex-row gap-3">
        <div className="bg-gray-700 basis-1/5 rounded-xl flex flex-row">
          <MixerSlider setMixerLevel={setMixerLevel} mixerLevel={mixerLevel} />
        </div>
        <div className="basis-4/5 rounded-xl flex flex-col gap-3">
          <div className={"basis-1/12 rounded-xl p-3 bg-gray-800"}>
            <h3 className={"text-gray-200 text-lg"}>{props.instrument.charAt(0).toUpperCase() + props.instrument.substring(1)}</h3>
          </div>
          <DeviceEffects name={props.name}/>
        </div>
      </div>
    </div>
  )
}

export const Mixer = () => {
  const devices = useSelector(state => state.devices)
  return (
      <div className="h-2/3 bg-gray-900 flex flex-row">
        <Device {...devices[0]} />
        <Device {...devices[1]} />
        <Device {...devices[2]} />
        <Device {...devices[3]} />
      </div>
  )
}