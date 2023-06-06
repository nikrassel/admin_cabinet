import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import TableHeader from "../../common/table/tableHeader"
import TableBody from "../../common/table/tableBody"
import SelectStatus from "../../common/form/selectStatus"
import _ from "lodash"
import { useDispatch } from "react-redux"
import { updateModerator } from '../../../store/moderators';
import { paginate } from "../../../utils/paginate"
import TextField from "../../common/form/textField"
import Pagination from "../../common/pagination"

const ModeratorTable = ({ moderators, users }) => {
    const dispatch = useDispatch()
    const validUsers = Object.values(users).filter((user) => user.moderator === "no")
    console.log(validUsers)
    const pageSize = 6
    const [currentPage, setCurrentPage] = useState(1)
    const [modList, setModLayout] = useState(moderators)
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
    const [search, setSearch] = useState("")
    const moderatorStatus = ["deleted", "active", "suspended"]
    function handleChangeStatus (name, value) {
        const temp = { ...moderators[name] }
        temp.status = value
        const tempMod = {
            ...modList,
            [name]: {
                ...temp
            }
        }
        dispatch(updateModerator(temp))
        setModLayout(tempMod)
    }
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
    if (moderators) {
        let modLayout = { ...modList }
        if (search) {
            const nameRegExp = new RegExp(`(?:${search.toLowerCase()})`, "g")
            modLayout = Object.values(modLayout).filter((moderator) =>
                nameRegExp.test(moderator.name.toLowerCase())
            )
        }
        const count = modLayout.lenght
        const sortedMod = _.orderBy(
            modLayout,
            [sortBy.path],
            [sortBy.order]
        )
        const modCrop = paginate(sortedMod, currentPage, pageSize)
        return (
            <>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                ></Pagination>
                <TextField
                    label=""
                    name="search"
                    value={search}
                    placeHolder="Поиск..."
                    onChange={handleChange}
                ></TextField>
                <table className="table table-dark table-striped">
                    <TableHeader 
                        columns={columns} 
                        onSort={handleSort} 
                        selectedSort={sortBy}/>
                    <TableBody data={modCrop} columns={columns} />
                </table>
            </>
        );
    }
   
}

ModeratorTable.propTypes = {
    moderators: PropTypes.object,
    users: PropTypes.object
}
 
export default ModeratorTable;