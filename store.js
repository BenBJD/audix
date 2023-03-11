import { configureStore } from "@reduxjs/toolkit"
import devicesSlice from "./slices/devicesSlice"
import sequencerSlice from "./slices/sequencerSlice"
import polySequencerSlice from "./slices/polySequencerSlice"

const store = configureStore({
    reducer: {
        devices: devicesSlice,
        sequencers: sequencerSlice,
        polySequencers: polySequencerSlice,
    },
})

export default store
