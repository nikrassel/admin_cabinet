import { createSlice } from "@reduxjs/toolkit"
import messageService from "../services/message.service"

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        messagesRequested: (state) => {
            state.isLoading = true
        },
        messagesReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        messagesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: messagesReducer, actions } = messageSlice
const { messagesRequested, messagesReceved, messagesRequestFailed } = actions

export const loadMessages = () => async (dispatch) => {
    dispatch(messagesRequested())
    try {
        const content = await messageService.get()
        dispatch(messagesReceved(content))
    } catch (error) {
        dispatch(messagesRequestFailed(error.message))
    }
}

export const getMessages = () => (state) => state.messages.entities

export default messagesReducer
