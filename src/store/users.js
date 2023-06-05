import { createSlice } from "@reduxjs/toolkit"
import usersService from "../services/users.service"

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceved, usersRequestFailed } = actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const content = await usersService.get()
        dispatch(usersReceved(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const getUsers = () => (state) => state.users.entities

export default usersReducer
