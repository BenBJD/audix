import {createSlice} from '@reduxjs/toolkit';

const devicesSlice = createSlice({
  name: 'devices',
  initialState: [
    {
      id: 0,
      instrument: "drums",
      preset: "rock",
      name: "Roland TD-17KV",
      username: "Ben",
      bgColor: "bg-red-700"
    },
    {
      id: 1,
      instrument: "lead",
      preset: "jupiterLead",
      name: "Jupiter Lead",
      username: "Friend 1",
      bgColor: "bg-yellow-700"
    },
    {
      id: 2,
      instrument: "bass",
      preset: "jupiterBass",
      name: "Bass Synth",
      username: "Friend 2",
      bgColor: "bg-blue-700"
    },
    {
      id: 3,
      instrument: "pad",
      preset: "jupiterPad",
      name: "Nice Pad",
      username: "Friend 3",
      bgColor: "bg-green-700"
    }
  ],
  reducers: {
    addDevice: (state, action) => {
      state.push(action.payload);
    },
    removeDevice: (state, action) => {
      state = state.filter(device => device.id !== action.payload)
    }
  },
})

export const {addDevice, removeDevice} = devicesSlice.actions

export default devicesSlice.reducer