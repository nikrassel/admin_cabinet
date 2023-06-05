import { createSlice } from "@reduxjs/toolkit"
import pushesService from "../services/pushes.service"

const pushesSlice = createSlice({
    name: "pushes",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        pushesRequested: (state) => {
            state.isLoading = true
        },
        pushesReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        pushesRequestedFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: pushesReducer, actions } = pushesSlice
const { pushesRequested, pushesReceved, pushesRequestedFailed } = actions

export const loadPushes = () => async (dispatch) => {
    dispatch(pushesRequested())
    try {
        const content = await pushesService.get()
        dispatch(pushesReceved(content))
    } catch (error) {
        dispatch(pushesRequestedFailed(error.message))
    }
}

export const getPushes = () => (state) => state.pushes.entities

export default pushesReducer
