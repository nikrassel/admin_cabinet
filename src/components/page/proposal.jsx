import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getMessages } from "../../store/messages"
import MessageTable from "./proposal/messageTable"
import AnswerForMessage from "./proposal/answerForMessage"

const Proposal = () => {
    const { id } = useParams()
    const messages = useSelector(getMessages())
    if (messages) {
        const validId = Object.keys(messages).includes(id)
        return (
            <>
                <h2>Предложения пользователей</h2>
                {id && validId ? (
                    <AnswerForMessage message={messages[id]} />
                ) : (
                    <MessageTable messages={messages}></MessageTable>
                )}
            </>
        )
    }
    return <h4>Loading...</h4>
}

export default Proposal
