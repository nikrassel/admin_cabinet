import { createSlice } from "@reduxjs/toolkit"
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
        }
    }
})

const { reducer: moderatorsReducer, actions } = moderatorsSlice
const { moderatorsRequested, moderatorsReceved, moderatorsRequestFailed } = actions

export const loadModerators = () => async (dispatch) => {
    dispatch(moderatorsRequested())
    try {
        const content = await moderatorsService.get()
        dispatch(moderatorsReceved(content))
    } catch (error) {
        dispatch(moderatorsRequestFailed(error.message))
    }
}

export const getModerators = () => (state) => state.moderators.entities

export default moderatorsReducer
