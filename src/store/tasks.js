import { createSlice } from "@reduxjs/toolkit"
import tasksService from "../services/tasks.service"

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        tasksRequested: (state) => {
            state.isLoading = true
        },
        tasksReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        tasksRequestedFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: tasksReducer, actions } = tasksSlice
const { tasksRequested, tasksReceved, tasksRequestedFailed } = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(tasksRequested())
    try {
        const content = await tasksService.get()
        dispatch(tasksReceved(content))
    } catch (error) {
        dispatch(tasksRequestedFailed(error.message))
    }
}

export const getTasks = () => (state) => state.users.entities

export default tasksReducer
