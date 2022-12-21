import {CogIcon, PlayIcon, PauseIcon, StopIcon} from "@heroicons/react/24/outline";
import * as Tone from "tone";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlayState } from "../slices/projectSlice"

const Transport = () => {
  const dispatch = useDispatch()
  const playState = useSelector(state => state.project.playState)
  return (
    <div className="flex flex-row basis-1/3 gap-3 justify-between">
      <div className="basis-1/3 justify-end flex flex-row">
        <div className="w-10">
          {playState === "playing" ? <PauseIcon onClick={() => dispatch(setPlayState("paused"))} className="text-gray-200 hover:text-orange-500" /> : <PlayIcon onClick={() => dispatch(setPlayState("playing"))} className="text-gray-200 hover:text-green-500" />}
        </div>
        <div className="w-10">
          {playState !== "stopped" ? <StopIcon onClick={() => dispatch(setPlayState("stopped"))} className="text-gray-200 hover:text-red-500" /> : <StopIcon className="text-red-500" />}
        </div>
      </div>
      <div className={"basis-2/3 rounded-lg bg-gray-800 flex flex-row justify-between p-1"}>
        <div className={"basis-1/4"}>
          <p className={"text-sm text-gray-200 h-1/2"}>BPM</p>
          <p className={"text-sm text-gray-200 h-1/2"}>120</p>
        </div>
        <div className={"basis-1/4"}>
          <p className={"text-sm text-gray-200 h-1/2"}>TS</p>
          <p className={"text-sm text-gray-200 h-1/2"}>4/4</p>
        </div>
        <div className="basis-1/4">
          <p className="text-sm text-gray-200 h-1/2">Time</p>
          <p className="text-sm text-gray-200 h-1/2">000.000</p>
        </div>
        <div className={"basis-1/4"}>
          <p className="text-sm text-gray-200 h-1/2">Bars</p>
          <p className="text-sm text-gray-200 h-1/2">0.0.0</p>
        </div>
      </div>
    </div>
  )
}

export const Header = () => {
  return (
    <header className="h-14 justify-between flex flex-row bg-gray-700 shadow-2xl p-2">
      <div className="basis-1/12 flex justify-center">
        <h2 className="text-gray-200 text-3xl">audix</h2>
      </div>
      <Transport />
      <div className="basis-1/12 flex justify-end">
        <div className="w-10">
          <CogIcon className="text-gray-200" />
        </div>
      </div>
    </header>
  )
}