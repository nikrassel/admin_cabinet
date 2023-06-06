import { combineReducers, configureStore } from "@reduxjs/toolkit"
import usersReducer from "./users"
import messagesReducer from "./messages"
import tasksReducer from "./tasks"
import pushesReducer from "./pushes"
import moderatorsReducer from "./moderators"

const rootReducer = combineReducers({
    users: usersReducer,
    messages: messagesReducer,
    tasks: tasksReducer,
    pushes: pushesReducer,
    moderators: moderatorsReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
