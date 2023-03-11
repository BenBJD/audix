import React from "react"
import { MuteButton } from "./Buttons"

export const DeviceHeader = (props) => {
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