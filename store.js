import {configureStore} from "@reduxjs/toolkit"
import devicesSlice from "./slices/devicesSlice"
import projectSlice from "./slices/projectSlice"

const store = configureStore({
  reducer: {
    devices: devicesSlice,
    project: projectSlice
  }
})

export default store