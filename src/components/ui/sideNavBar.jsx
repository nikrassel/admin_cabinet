import React from "react"
import "../../App.css"

const SideNavBar = () => {
    return (
        <div className="d-flex flex-column text-bg-secondary align-items-start text-start position-relative">
            <button type="button" className="btn btn-outline-light m-2">
                Предложения
            </button>
            <button type="button" className="btn btn-outline-light m-2">
                Модераторы
            </button>
            <button type="button" className="btn btn-outline-light m-2">
                Задачи
            </button>
            <button type="button" className="btn btn-outline-light m-2">
                Уведомления
            </button>
        </div>
    )
}

export default SideNavBar
