import { createSlice } from "@reduxjs/toolkit"

const devicesSlice = createSlice({
    name: "devices",
    initialState: [],
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
