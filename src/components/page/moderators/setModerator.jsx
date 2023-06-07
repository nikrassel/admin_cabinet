import React, { useState, useEffect } from "react"
import SetButton from "../../common/form/setButton"
import TextField from "../../common/form/textField"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import TableHeader from "../../common/table/tableHeader"
import TableBody from "../../common/table/tableBody"
import { useDispatch } from "react-redux"
import _ from "lodash"
import { updateUser } from "../../../store/users"
import { createModerator } from "../../../store/moderators"
import { useNavigate } from "react-router-dom"

const SetModerator = ({ users }) => {
    const validUsers = Object.values(users).filter(
        (user) => user.moderator === "no"
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pageSize = 6
    const [currentPage, setCurrentPage] = useState(1)
    const [userList, setUserList] = useState(validUsers)
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
    const [search, setSearch] = useState("")
    useEffect(() => {
        setCurrentPage(1)
    }, [search])
    function handlePageChange(pageIndex) {
        setCurrentPage(pageIndex)
    }
    function handleSort(item) {
        setSortBy(item)
    }
    function handleChange({ name, value }) {
        setSearch(value)
    }
    function handleSetModerator(name) {
        const temp = { ...users[name] }
        temp.moderator = "yes"
        const tempUsers = validUsers.filter((user) => user.id !== name)
        dispatch(updateUser(temp))
        dispatch(createModerator(temp))
        setUserList(tempUsers)
    }
    function navigateBack() {
        navigate("/moderators")
    }
    const columns = {
        avatar: {
            component: (
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    width="50"
                    alt="avatar"
                ></img>
            )
        },
        name: {
            path: "name",
            name: "Имя пользователя"
        },
        changeStatus: {
            component: (item) => (
                <SetButton
                    label={"Сделать модератором"}
                    parentId={item.id}
                    onChange={handleSetModerator}
                />
            )
        }
    }
    if (userList) {
        let userLayout = { ...userList }
        if (search) {
            const nameRegExp = new RegExp(`(?:${search.toLowerCase()})`, "g")
            userLayout = Object.values(userLayout).filter((user) =>
                nameRegExp.test(user.name.toLowerCase())
            )
        }
        const count = Object.keys(userLayout).length
        const sortedUsers = _.orderBy(userLayout, [sortBy.path], [sortBy.order])
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        return (
            <>
                <h4>Назначте новых модераторов</h4>
                <div className="row align-items-center">
                    <div className="col ">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        ></Pagination>
                    </div>
                    <div className="col">
                        <TextField
                            label=""
                            name="search"
                            value={search}
                            placeHolder="Поиск..."
                            onChange={handleChange}
                        ></TextField>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={navigateBack}
                        >
                            Назад
                        </button>
                    </div>
                </div>
                <table className="table table-dark table-striped">
                    <TableHeader
                        columns={columns}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                    <TableBody data={userCrop} columns={columns} />
                </table>
            </>
        )
    }
}

export default SetModerator
