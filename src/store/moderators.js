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
        }
    }
})

const { reducer: moderatorsReducer, actions } = moderatorsSlice
const { moderatorsRequested, moderatorsReceved, moderatorsRequestFailed, moderatorsUpdate } = actions
const moderatorUpdateRequested = createAction("moderators/updateRequested")
const moderatorUpdateFailed = createAction("moderators/updateFailed")

export const loadModerators = () => async (dispatch) => {
    dispatch(moderatorsRequested())
    try {
        const content = await moderatorsService.get()
        dispatch(moderatorsReceved(content))
    } catch (error) {
        dispatch(moderatorsRequestFailed(error.message))
    }
}

export const updateModerator = (data) => async(dispatch) => {
    dispatch(moderatorUpdateRequested)
    try {
        const content = await moderatorsService.update(data)
        dispatch(moderatorsUpdate(content))
    } catch (error) {
        dispatch(moderatorUpdateFailed())
    }
}

export const getModerators = () => (state) => state.moderators.entities

export default moderatorsReducer
