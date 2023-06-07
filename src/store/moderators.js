import { createAction, createSlice } from "@reduxjs/toolkit"
import moderatorsService from "../services/moderators.service"

const moderatorsSlice = createSlice({
    name: "moderators",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        moderatorsRequested: (state) => {
            state.isLoading = true
        },
        moderatorsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        moderatorsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        moderatorsUpdate: (state, action) => {
            state.entities[action.payload.id] = action.payload
        },
        moderatorsAdd: (state, action) => {
            state.entities = {
                ...state.entities,
                [action.payload.id]: action.payload
            }
        }
    }
})

const { reducer: moderatorsReducer, actions } = moderatorsSlice
const {
    moderatorsRequested,
    moderatorsReceved,
    moderatorsRequestFailed,
    moderatorsUpdate,
    moderatorsAdd
} = actions
const moderatorUpdateRequested = createAction("moderators/updateRequested")
const moderatorUpdateFailed = createAction("moderators/updateFailed")
const moderatorCreateRequested = createAction("moderator/createRequested")
const moderatorCreateFailed = createAction("moderator/createFailed")

export const loadModerators = () => async (dispatch) => {
    dispatch(moderatorsRequested())
    try {
        const content = await moderatorsService.get()
        dispatch(moderatorsReceved(content))
    } catch (error) {
        dispatch(moderatorsRequestFailed(error.message))
    }
}

export const createModerator = (data) => async (dispatch) => {
    dispatch(moderatorCreateRequested())
    const newModerator = {
        id: data.id,
        name: data.name,
        status: "active"
    }
    try {
        const content = await moderatorsService.create(newModerator)
        dispatch(moderatorsAdd(content))
    } catch (error) {
        dispatch(moderatorCreateFailed())
    }
}

export const updateModerator = (data) => async (dispatch) => {
    dispatch(moderatorUpdateRequested())
    try {
        const content = await moderatorsService.update(data)
        dispatch(moderatorsUpdate(content))
    } catch (error) {
        dispatch(moderatorUpdateFailed())
    }
}

export const getModerators = () => (state) => state.moderators.entities

export default moderatorsReducer
