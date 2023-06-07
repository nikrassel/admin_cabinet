import React from "react"

const SetButton = ({ label, parentId, onChange }) => {
    function handleChange(target) {
        const name = target.target.name
        onChange(name)
    }
    return (
        <button
            type="button"
            className="btn btn-outline-danger"
            name={parentId}
            onClick={handleChange}
        >
            {label}
        </button>
    )
}

export default SetButton
