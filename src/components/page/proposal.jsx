import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getMessages } from "../../store/messages"
import MessageTable from "./proposal/messageTable"

const Proposal = () => {
    const { id } = useParams()
    const messages = useSelector(getMessages())
    if (messages) {
        const validId = []
        for (const message of Object.values(messages)) {
            validId.push(message.id)
        }
        console.log(validId)
        return (
            <>
                <h2>Предложения пользователей</h2>
                {id && id in validId ? (
                    <MessageTable messages={messages}></MessageTable>
                ) : (
                    <MessageTable messages={messages}></MessageTable>
                )}
            </>
        )
    }
    return <h4>Loading...</h4>
}

export default Proposal
