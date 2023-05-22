import { createSlice } from "@reduxjs/toolkit"

const sequencerSlice = createSlice({
    name: "sequencers",
    initialState: [
        {
            instrumentId: 0,
            steps: [
                // bar 1
                { notes: [{ note: "E3", velocity: 0.5, duration: "8n" }] },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 2
                { notes: [] },
                { notes: [] },
                { note: "E3", velocity: 0.5, duration: "8n" },
                { notes: [] },
                // 3
                { note: "G3", velocity: 0.5, duration: "8n" },
                { notes: [] },
                { notes: [] },
                { note: "E3", velocity: 0.5, duration: "8n" },
                // 4
                { notes: [] },
                { notes: [] },
                { note: "D3", velocity: 0.5, duration: "8n" },
                { notes: [] },
                // 5
                { note: "C3", velocity: 0.5, duration: "2n" },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 6
                { notes: [] },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 7
                { note: "B2", velocity: 0.5, duration: "2n" },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 8
                { notes: [] },
                { notes: [] },
                { notes: [] },
                { notes: [] },
            ],
        },
        {
            instrumentId: 1,
            steps: [
                // bar 1
                { notes: [{ note: "E3", velocity: 0.5, duration: "8n" }] },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 2
                { notes: [] },
                { notes: [] },
                { note: "E3", velocity: 0.5, duration: "8n" },
                { notes: [] },
                // 3
                { note: "G3", velocity: 0.5, duration: "8n" },
                { notes: [] },
                { notes: [] },
                { note: "E3", velocity: 0.5, duration: "8n" },
                // 4
                { notes: [] },
                { notes: [] },
                { note: "D3", velocity: 0.5, duration: "8n" },
                { notes: [] },
                // 5
                { note: "C3", velocity: 0.5, duration: "2n" },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 6
                { notes: [] },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 7
                { note: "B2", velocity: 0.5, duration: "2n" },
                { notes: [] },
                { notes: [] },
                { notes: [] },
                // 8
                { notes: [] },
                { notes: [] },
                { notes: [] },
                { notes: [] },
            ],
        },
        {
            instrumentId: 2,
            steps: [
                {
                    notes: [
                        { note: "C4", velocity: 0.5, duration: "8n" },
                        { note: "E4", velocity: 0.5, duration: "8n" },
                    ],
                },
                { notes: [] },
                { notes: [{ note: "E4", velocity: 0.5, duration: "8n" }] },
                { notes: [] },
                {
                    notes: [
                        { note: "D4", velocity: 0.5, duration: "8n" },
                        { note: "E4", velocity: 0.5, duration: "8n" },
                    ],
                },
                { notes: [] },
                { notes: [{ note: "E4", velocity: 0.5, duration: "8n" }] },
                { notes: [] },
            ],
        },
    ],
    reducers: {
        addNote: (state, action) => {
            const { instrumentId, stepIndex, value } = action.payload
            state.map((s) => {
                if (s.instrumentId === instrumentId) {
                    s.steps[stepIndex].notes.push(value)
                    return s
                }
                return s
            })
        },
        removeNote: (state, action) => {
            const { instrumentId, stepIndex, notePitch } = action.payload
            state.map((s) => {
                if (s.instrumentId === instrumentId) {
                    s.steps[stepIndex].notes = s.steps[stepIndex].notes.filter(
                        (n) => n.note !== notePitch
                    )
                    return s
                }
                return s
            })
        },
        setStepsNumber: (state, action) => {
            const { instrumentId, stepsNumber } = action.payload
            state.map((s) => {
                if (s.instrumentId === instrumentId) {
                    if (s.length < stepsNumber) {
                        s.slice(0, action.payload)
                    } else {
                        s.push(
                            Array(stepsNumber - s.length).fill({ notes: [] })
                        )
                    }
                    return s
                }
                return s
            })
        },
        addSequencer: (state, action) => {
            const { instrumentId, steps } = action.payload
            state.push({ instrumentId: instrumentId, steps: steps })
        },
        removeSequencer: (state, action) => {
            const { instrumentId } = action.payload
            state.filter((s) => s.instrumentId !== instrumentId)
        },
    },
})

export const {
    addNote,
    removeNote,
    clearSteps,
    setStepsNumber,
    addSequencer,
    removeSequencer,
} = sequencerSlice.actions

export default sequencerSlice.reducer
