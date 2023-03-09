import { useReducer } from "react"

export const useSequencerSteps = (initialSteps) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_STEP":
                return state.map((step, index) =>
                    index === action.payload.index ? action.payload.step : step
                )
            case "CLEAR":
                return state.map(() => null)
            case "SET_STEPS_NUM":
                return state.length > action.payload
                    ? state.slice(0, action.payload)
                    : state.concat(
                          Array(action.payload - state.length).fill(null)
                      )
            default:
                return state
        }
    }, initialSteps)

    return [state, dispatch]
}

export const usePolySequencerSteps = (initialSteps) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_STEP":
                return state.map((step, index) => {
                    if (index === action.payload.index) {
                        step.notes.push(action.payload.note)
                        return step
                    } else {
                        return step
                    }
                })
            case "REMOVE_STEP":
                return state.map((step, index) => {
                    if (index === action.payload.index) {
                        step.notes.splice(action.payload["subIndex"], 1)
                        return step
                    } else {
                        return step
                    }
                })
            case "CLEAR":
                return state.map(() => {
                    return {
                        notes: [],
                    }
                })
            case "SET_STEPS_NUM":
                return state.length > action.payload
                    ? state.slice(0, action.payload)
                    : state.concat(
                          Array(action.payload - state.length).fill({
                              notes: [],
                          })
                      )
            default:
                return state
        }
    }, initialSteps)

    return [state, dispatch]
}
