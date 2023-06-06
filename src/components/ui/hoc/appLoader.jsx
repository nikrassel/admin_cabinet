// import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUsersList } from "../../../store/users"
import { loadMessages } from "../../../store/messages"
import { loadTasks } from "../../../store/tasks"
import { loadPushes } from "../../../store/pushes"
import { loadModerators } from "../../../store/moderators"

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    dispatch(loadUsersList())
    dispatch(loadMessages())
    dispatch(loadTasks())
    dispatch(loadPushes())
    dispatch(loadModerators())
    return children
}

export default AppLoader
