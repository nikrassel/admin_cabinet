import React from "react"

const SelectMessageStatus = ({ label, values, parentId, onChange, onMove }) => {
    function handleChange(target) {
        const name = target.target.name
        const value = target.target.value
        onChange(name, value)
    }
    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {label}
            </button>
            <ul className="dropdown-menu" id={parentId}>
                {values.map((value) => (
                    <li key={value} className="">
                        <button
                            type="button"
                            className="btn btn-danger m-2"
                            name={parentId}
                            value={value}
                            onClick={handleChange}
                        >
                            {value}
                        </button>
                    </li>
                ))}
                <br color="dark" />
                <li>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => onMove(parentId)}
                    >
                        Ответить
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default SelectMessageStatus
