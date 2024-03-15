import { configureStore } from "@reduxjs/toolkit"
import devicesSlice from "./slices/devicesSlice"
import sequencerSlice from "./slices/sequencerSlice"

const store = configureStore({
    reducer: {
        devices: devicesSlice,
        sequencers: sequencerSlice,
    },
})

export default store
