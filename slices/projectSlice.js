import {createSlice} from '@reduxjs/toolkit';

const projectSlice = createSlice(
  {
    name: 'project',
    initialState: {
      playState: "stopped",
    },
    reducers: {
      setPlayState: (state, action) => {
        state.playState = action.payload;
      }
    },
  },
)

export const { getPlayState, setPlayState } = projectSlice.actions;

export default projectSlice.reducer;
