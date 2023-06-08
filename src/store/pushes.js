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
        },
        pushAdd: (state, action) => {
            state.entities = {
                ...state.entities,
                [action.payload.id]: action.payload
            }
        }
    }
})

const { reducer: pushesReducer, actions } = pushesSlice
const { pushesRequested, pushesReceved, pushesRequestedFailed } = actions
const pushCreateRequested = createAction("push/createRequested")
const pushCreateFailed = createAction("push/createFailed")

export const loadPushes = () => async (dispatch) => {
    dispatch(pushesRequested())
    try {
        const content = await pushesService.get()
        dispatch(pushesReceved(content))
    } catch (error) {
        dispatch(pushesRequestedFailed(error.message))
    }
}

export const createPush = (data) => async (dispatch) => {
    dispatch(pushCreateRequested())
    try {
        const content = await pushesService.create(data)
        dispatch(pushAdd(content))
    } catch (error) {
        dispatch(pushCreateFailed())
    }
}

export const getPushes = () => (state) => state.pushes.entities

export default pushesReducer
