import React, { useState } from 'react';
import PropTypes from "prop-types"
import TableHeader from "../../common/table/tableHeader"
import TableBody from "../../common/table/tableBody"
import SelectStatus from "../../common/form/selectStatus"

const ModeratorTable = ({ moderators, users }) => {
    const validUsers = Object.values(users).filter((user) => user.moderator === "no")
    console.log(validUsers)
    const [modLayout, setModLayout] = useState(moderators)
    const moderatorStatus = ["deleted", "active", "suspended"]
    function handleChangeStatus (name, value) {
        console.log(name)
        console.log(value)
    }
    const columns = {
        avatar: {
            component: <img src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                width="50"
                alt="avatar"></img>
        },
        name: {
            path: "name",
            name: "Имя пользователя"
        },
        status: {
            path: "status",
            name: "Статус"
        },
        changeStatus: {
            component: (item) => (
                <SelectStatus
                    label="Выберите статус"
                    values={moderatorStatus}
                    parentId={item.id}
                    onChange={handleChangeStatus}
                />
            )
        }
    }
    return (
        <table className="table table-dark table-striped">
            <TableHeader columns={columns}/>
            <TableBody data={moderators} columns={columns} />
        </table>
    );
}

ModeratorTable.propTypes = {
    moderators: PropTypes.object,
    users: PropTypes.object
}
 
export default ModeratorTable;