import React from "react"
import "../../App.css"
import { useNavigate } from "react-router-dom"

const SideNavBar = () => {
    const navigate = useNavigate()
    function handleNavigate(target) {
        const direction = target.target.id
        if (direction === "proposals") {
            navigate("/")
        } else if (direction === "moderators") {
            navigate("/moderators")
        } else if (direction === "tasks") {
            navigate("/tasks")
        } else if (direction === "pushes") {
            navigate("/messages")
        }
        const navBtns = document.querySelectorAll(".navbtn")
        for (const btn of navBtns) {
            btn.classList = "navbtn btn btn-outline-light m-2"
        }
        target.target.className = "navbtn btn btn-outline-light m-2 active"
    }
    return (
        <div className="d-flex flex-column text-bg-secondary align-items-start text-start position-relative">
            <button
                type="button"
                className="navbtn btn btn-outline-light m-2"
                id="proposals"
                onClick={handleNavigate}
            >
                Предложения
            </button>
            <button
                type="button"
                className="navbtn btn btn-outline-light m-2"
                id="moderators"
                onClick={handleNavigate}
            >
                Модераторы
            </button>
            <button
                type="button"
                className="navbtn btn btn-outline-light m-2"
                id="tasks"
                onClick={handleNavigate}
            >
                Задачи
            </button>
            <button
                type="button"
                className="navbtn btn btn-outline-light m-2"
                id="pushes"
                onClick={handleNavigate}
            >
                Уведомления
            </button>
        </div>
    )
}

export default SideNavBar
