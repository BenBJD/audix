import { createSlice } from "@reduxjs/toolkit"

const sequencerSlice = createSlice({
    name: "sequencers",
    initialState: [
        {
            instrumentId: 0,
            steps: [
                // bar 1
                { note: "E3", velocity: 0.5, duration: "8n" },
                null,
                null,
                null,
                // 2
                null,
                null,
                { note: "E3", velocity: 0.5, duration: "8n" },
                null,
                // 3
                { note: "G3", velocity: 0.5, duration: "8n" },
                null,
                null,
                { note: "E3", velocity: 0.5, duration: "8n" },
                // 4
                null,
                null,
                { note: "D3", velocity: 0.5, duration: "8n" },
                null,
                // 5
                { note: "C3", velocity: 0.5, duration: "2n" },
                null,
                null,
                null,
                // 6
                null,
                null,
                null,
                null,
                // 7
                { note: "B2", velocity: 0.5, duration: "2n" },
                null,
                null,
                null,
                // 8
                null,
                null,
                null,
                null,
            ],
        },
        {
            instrumentId: 1,
            steps: [
                // bar 1
                { note: "E3", velocity: 0.5, duration: "8n" },
                null,
                null,
                null,
                // 2
                null,
                null,
                { note: "E3", velocity: 0.5, duration: "8n" },
                null,
                // 3
                { note: "G3", velocity: 0.5, duration: "8n" },
                null,
                null,
                { note: "E3", velocity: 0.5, duration: "8n" },
                // 4
                null,
                null,
                { note: "D3", velocity: 0.5, duration: "8n" },
                null,
                // 5
                { note: "C3", velocity: 0.5, duration: "2n" },
                null,
                null,
                null,
                // 6
                null,
                null,
                null,
                null,
                // 7
                { note: "B2", velocity: 0.5, duration: "2n" },
                null,
                null,
                null,
                // 8
                null,
                null,
                null,
                null,
            ],
        },
    ],
    reducers: {
        setStep: (state, action) => {
            const { instrumentId, stepIndex, value } = action.payload
            state.map((s) => {
                if (s.instrumentId === instrumentId) {
                    s.steps[stepIndex] = value
                    return s
                }
                return s
            })
        },
        clearSteps: (state, action) => {
            const { instrumentId } = action.payload
            state.map((s) => {
                if (s.instrumentId === instrumentId) {
                    s.steps.fill(null)
                    return s
                }
                return s
            })
        },
        setStepsNumber: (state, action) => {
            const { instrumentId, stepsNumber } = action.payload
            state.map((s) => {
                if (s.id === instrumentId) {
                    if (s.length < stepsNumber) {
                        s.slice(0, action.payload)
                    } else {
                        s.push(Array(stepsNumber - s.length).fill(null))
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
    setStep,
    clearSteps,
    setStepsNumber,
    addSequencer,
    removeSequencer,
} = sequencerSlice.actions

export default sequencerSlice.reducer
