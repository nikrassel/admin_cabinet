// import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUsersList } from "../../../store/users"
import { loadMessages } from "../../../store/messages"
import { loadTasks } from "../../../store/tasks"
import { loadPushes } from "../../../store/pushes"

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    dispatch(loadUsersList())
    dispatch(loadMessages())
    dispatch(loadTasks())
    dispatch(loadPushes())
    return children
}

export default AppLoader
