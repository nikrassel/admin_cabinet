import React from "react"
import { useSelector } from "react-redux"
import { getUsers } from "../../store/users"
import { getModerators } from "../../store/moderators"
import ModeratorTable from "./moderators/moderatorTable"
import { useParams } from "react-router-dom"
import SetModerator from "./moderators/setModerator"

const ModeratorList = () => {
    const { addNew } = useParams()
    const users = useSelector(getUsers())
    const moderators = useSelector(getModerators())
    if (users && moderators) {
        return (
            <>
                <h2>Модераторы</h2>
                {addNew
                    ? <SetModerator users={users} />
                    : <ModeratorTable moderators={moderators} />}
            </>
        )
    }
    return <h5>Loading...</h5>
}

export default ModeratorList
