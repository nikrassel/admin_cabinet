import { combineReducers, configureStore } from "@reduxjs/toolkit"
import usersReducer from "./users"
import messagesReducer from "./messages"
import tasksReducer from "./tasks"
import pushesReducer from "./pushes"

const rootReducer = combineReducers({
    users: usersReducer,
    messages: messagesReducer,
    tasks: tasksReducer,
    pushes: pushesReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
