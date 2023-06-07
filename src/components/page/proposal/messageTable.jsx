import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import TableHeader from "../../common/table/tableHeader"
import TableBody from "../../common/table/tableBody"
import dateFormater from "../../../utils/dateFormater"
import _ from "lodash"
import { paginate } from "../../../utils/paginate"
import TextField from "../../common/form/textField"
import Pagination from "../../common/pagination"
import SelectMessageStatus from "../../common/form/selectMessageStatus"
import { updateMessage } from "../../../store/messages"

const MessageTable = ({ messages }) => {
    const pageSize = 6
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [messageList, setMessageList] = useState(messages)
    const messageStatus = ["Принято", "Отклонено", "На проверке"]
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
    function handleChangeMessageStatus(name, value) {
        const temp = { ...messages[name] }
        temp.status = value
        console.log(temp)
        const tempMessages = {
            ...messageList,
            [name]: {
                ...temp
            }
        }
        dispatch(updateMessage(temp))
        setMessageList(tempMessages)
    }
    const columns = {
        avatar: {
            name: "Пользователь",
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
        title: {
            path: "title",
            name: "Тема"
        },
        message: {
            path: "text",
            name: "Сообщение"
        },
        date: {
            name: "Дата",
            path: "creationDate",
            component: (item) => <p>{dateFormater(item.creationDate)}</p>
        },
        status: {
            name: "Статус",
            component: (item) => (
                <SelectMessageStatus
                    label={item.status}
                    values={messageStatus}
                    parentId={item.id}
                    onChange={handleChangeMessageStatus}
                />
            )
        }
    }
    if (messages) {
        let messageLayout = { ...messageList }
        if (search) {
            const nameRegExp = new RegExp(`(?:${search.toLowerCase()})`, "g")
            messageLayout = Object.values(messageLayout).filter((message) =>
                nameRegExp.test(message.title.toLowerCase())
            )
        }
        const count = Object.keys(messageLayout).lenght
        const sortedMessages = _.orderBy(
            messageLayout,
            [sortBy.path],
            [sortBy.order]
        )
        const messageCrop = paginate(sortedMessages, currentPage, pageSize)
        return (
            <>
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
                </div>
                <table className="table table-dark table-striped">
                    <TableHeader
                        columns={columns}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                    <TableBody data={messageCrop} columns={columns} />
                </table>
            </>
        )
    }
}

MessageTable.propTypes = {
    messages: PropTypes.object
}

export default MessageTable
