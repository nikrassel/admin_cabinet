import { createAction, createSlice } from "@reduxjs/toolkit"
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
        },
        userUpdate: (state, action) => {
            state.entities[action.payload.id] = action.payload
        }
    }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceved, usersRequestFailed, userUpdate } = actions
const userUpdateRequested = createAction("user/updateRequested")
const userUpdateFailed = createAction("user/updateFailed")

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const content = await usersService.get()
        dispatch(usersReceved(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const updateUser = (data) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const content = await usersService.update(data)
        dispatch(userUpdate(content))
    } catch (error) {
        dispatch(userUpdateFailed())
    }
}

export const getUsers = () => (state) => state.users.entities

export default usersReducer
