import { createAction, createSlice } from "@reduxjs/toolkit"
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
        },
        messageUpdate: (state, action) => {
            state.entities[action.payload.id] = action.payload
        }
    }
})

const { reducer: messagesReducer, actions } = messageSlice
const {
    messagesRequested,
    messagesReceved,
    messagesRequestFailed,
    messageUpdate
} = actions
const messageUpdateRequested = createAction("message/updateRequested")
const messageUpdateFailed = createAction("message/updateFailed")

export const loadMessages = () => async (dispatch) => {
    dispatch(messagesRequested())
    try {
        const content = await messageService.get()
        dispatch(messagesReceved(content))
    } catch (error) {
        dispatch(messagesRequestFailed(error.message))
    }
}

export const updateMessage = (data) => async (dispatch) => {
    dispatch(messageUpdateRequested())
    try {
        const content = await messageService.update(data)
        dispatch(messageUpdate(content))
    } catch (error) {
        dispatch(messageUpdateFailed())
    }
}

export const getMessages = () => (state) => state.messages.entities

export default messagesReducer
