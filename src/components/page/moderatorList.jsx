import React from "react"
import { useSelector } from "react-redux"
import { getUsers } from "../../store/users"
import { getModerators } from "../../store/moderators"
import ModeratorTable from "./moderators/moderatorTable"

const ModeratorList = () => {
    // const pageSize = 6
    // const [currentPage, setCurrentPage] = useState(1)
    const users = useSelector(getUsers())
    const moderators = useSelector(getModerators())
    // const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
    // const [search, setSearch] = useState("")
    return (
        <>
            <h2>Модераторы</h2>
            {users && moderators
                ? <ModeratorTable moderators={moderators} users={users} />
                : <h5>Loading...</h5>}
        </>
    )
}

export default ModeratorList
