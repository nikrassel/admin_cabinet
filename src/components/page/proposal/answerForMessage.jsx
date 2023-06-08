import React, { useState } from "react"
import { useSelector } from "react-redux"
import { getUserById } from "../../../store/users"
import TextField from "../../common/form/textField"
import { useNavigate } from "react-router-dom"

const AnswerForMessage = ({ message }) => {
    const navigate = useNavigate()
    const sender = useSelector(getUserById(message.senderId))
    const [answer, setAnswer] = useState({
        title: "",
        text: ""
    })
    function handleTitleChange({ name, value }) {
        setAnswer((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    function handleTextChange(target) {
        setAnswer((prevState) => ({
            ...prevState,
            text: target.target.value
        }))
    }
    function handleBack() {
        navigate("/")
    }
    if (sender) {
        return (
            <>
                <h3>Ответ на обращение</h3>
                <span className="badge text-bg-secondary">{sender.name}</span>
                <p>Описание</p>
                <div className="row">
                    <div className="col-8">
                        <TextField
                            placeHolder="Введите заголовок"
                            name="title"
                            value={answer.title}
                            onChange={handleTitleChange}
                        />
                        <textarea
                            className="form-control"
                            label="Сообщение"
                            name="text"
                            rows="5"
                            value={answer.text}
                            placeholder="Введите сообщение..."
                            onChange={handleTextChange}
                        ></textarea>
                    </div>
                    <div className="col-4 align-self-end">
                        <button
                            type="button"
                            className="btn btn-danger m-1"
                            onClick={handleBack}
                        >
                            Ответить
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger text-light m-1"
                            onClick={handleBack}
                        >
                            Отменить
                        </button>
                    </div>
                </div>
            </>
        )
    }
    return <h4>Loading...</h4>
}

export default AnswerForMessage
