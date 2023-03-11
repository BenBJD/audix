import { createSlice } from "@reduxjs/toolkit"

const devicesSlice = createSlice({
    name: "devices",
    initialState: [
        {
            id: 0,
            name: "Bass Synth",
            username: "Ben",
            bgColor: "bg-yellow-700",
            instrument: "SequencedLeadSynth",
            controls: {
                level: 100,
                pan: 0,
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 0.01,
                waveform: "sine",
            },
        },
        {
            id: 1,
            name: "Lead Synth",
            username: "Not Ben",
            bgColor: "bg-blue-700",
            instrument: "SequencedLeadSynth",
            controls: {
                level: 100,
                pan: 0,
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 0.01,
                waveform: "sine",
            },
        },
        {
            id: 2,
            name: "Drum",
            username: "Still Not Ben",
            bgColor: "bg-green-700",
            instrument: "DrumKit",
            controls: {
                level: 100,
                pan: 0,
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 0.01,
            },
        },
    ],
    reducers: {
        newDevice: (state, action) => {
            state.push(action.payload)
            return state
        },
        removeDevice: (state, action) => {
            state = state.filter((device) => device.id !== action.payload)
            return state
        },
        setInstrumentControl: (state, action) => {
            state = state.map((device) => {
                if (device.id === action.payload.id) {
                    device.controls[action.payload.control] =
                        action.payload.value
                }
                return device
            })
            return state
        },
        setVariable: (state, action) => {
            state = state.map((device) => {
                if (device.id === action.payload.id) {
                    device[action.payload.variable] = action.payload.value
                }
                return device
            })
            return state
        },
    },
})

export const { newDevice, removeDevice, setInstrumentControl, setVariable } =
    devicesSlice.actions

export default devicesSlice.reducer
