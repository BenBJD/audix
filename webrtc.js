import { useDispatch } from "react-redux"
import { clearSteps as monoClearSteps, setStep } from "./slices/sequencerSlice"
import {
    addNote,
    removeNote,
    clearSteps as polyClearSteps,
} from "./slices/polySequencerSlice"
import { setInstrumentControl } from "./slices/devicesSlice"
import Peer from "peerjs"
import { LinkIcon } from "@heroicons/react/24/outline"

export const PeerJSIcon = () => {
    const dispatch = useDispatch()
    // const peer = new Peer(undefined, {
    //     host: "peerjs.bjdhome.co.uk/",
    //     port: 443,
    //     path: "",
    //     secure: true,
    //     debug: 3,
    // })
    const peer = new Peer(undefined, {
        debug: 3,
    })

    peer.on("open", (id) => {
        console.log("My peer ID is: " + id)
    })

    peer.on("connection", (conn) => {
        conn.on("action", (data) => {
            switch (data.type) {
                case "setStep":
                    dispatch(
                        setStep({
                            instrumentId: data.instrumentId,
                            stepIndex: data.stepIndex,
                            value: data.value,
                        })
                    )
                    break
                case "clearSteps":
                    dispatch(
                        monoClearSteps({
                            instrumentId: data.instrumentId,
                        })
                    )
                case "polyAddNote":
                    dispatch(
                        addNote({
                            instrumentId: data.instrumentId,
                            stepIndex: data.stepIndex,
                            value: data.value,
                        })
                    )
                    break
                case "polyRemoveNote":
                    dispatch(
                        removeNote({
                            instrumentId: data.instrumentId,
                            stepIndex: data.stepIndex,
                            notePitch: data.notePitch,
                        })
                    )
                    break
                case "polyClearSteps":
                    dispatch(
                        polyClearSteps({
                            instrumentId: data.instrumentId,
                        })
                    )
                case "setInstrumentControl":
                    dispatch(
                        setInstrumentControl({
                            id: data.instrumentId,
                            control: data.control,
                            value: data.value,
                        })
                    )
                default:
                    break
            }
        })

        conn.send("")
    })

    return <LinkIcon className="h-6 w-6 text-green-500" />
}
