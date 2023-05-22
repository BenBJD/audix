import { useDispatch, useSelector } from "react-redux"
import { addNote, removeNote, clearSteps } from "./slices/sequencerSlice"
import { setInstrumentControl } from "./slices/devicesSlice"
import Peer from "peerjs"
import { LinkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const peer = new Peer(Math.floor(Math.random() * 1000000), {
    debug: 3,
})

export const PeerJSIcon = () => {
    const dispatch = useDispatch()
    const [peerId, setPeerId] = useState("Not Set")

    // State data if needed
    const sequencers = useSelector((state) => state.sequencers)
    const devices = useSelector((state) => state.devices)

    peer.on("open", (id) => {
        setPeerId(id)
    })

    peer.on("connection", (conn) => {
        conn.on("action", (data) => {
            switch (data.type) {
                case "clearSteps":
                    dispatch(
                        clearSteps({
                            instrumentId: data.instrumentId,
                        })
                    )
                case "addNote":
                    dispatch(
                        addNote({
                            instrumentId: data.instrumentId,
                            stepIndex: data.stepIndex,
                            note: data.note,
                        })
                    )
                    break
                case "removeNote":
                    dispatch(
                        removeNote({
                            instrumentId: data.instrumentId,
                            stepIndex: data.stepIndex,
                            notePitch: data.notePitch,
                        })
                    )
                    break
                case "setInstrumentControl":
                    dispatch(
                        setInstrumentControl({
                            id: data.instrumentId,
                            control: data.control,
                            value: data.value,
                        })
                    )
                case "getSteps":
                    conn.send({
                        type: "getSteps",
                        steps: sequencers.filter(
                            (s) => s.instrumentId === data.instrumentId
                        ).steps,
                    })
                    break
                case "getInstrumentControls":
                    conn.send({
                        type: "getInstrumentControls",
                        controls: devices.filter(
                            (d) => d.id === data.instrumentId
                        ).controls,
                    })
                    break
                case "playNote":
                    break
                default:
                    break
            }
        })
    })

    return (
        <div className={"flex flex-row basis-1/12"}>
            {peerId !== "Not Set" ? (
                <LinkIcon className="text-blue-500" />
            ) : (
                <LinkIcon className="text-red-500" />
            )}
            <p className={"m-auto"}>{peerId}</p>
        </div>
    )
}
