import { configureStore } from "@reduxjs/toolkit"
import devicesSlice from "./slices/devicesSlice"

const store = configureStore({
    reducer: {
        devices: devicesSlice,
    },
})

export default store
