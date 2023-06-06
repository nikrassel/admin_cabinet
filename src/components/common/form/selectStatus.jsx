import React from 'react';
import PropTypes from "prop-types"

const SelectStatus = ({ label, values, parentId, onChange }) => {
    function handleChange(target) {
        const name = target.target.name
        const value = target.target.value
        onChange(name, value)
    }
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {label}
            </button>
            <ul className="dropdown-menu" id={parentId}>
                {values.map((value) => (
                    <li key={value} className=''>
                        <button type="button" className="btn btn-danger m-2" name={parentId} value={value} onClick={handleChange}>{value}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

SelectStatus.propTypes = {
    label: PropTypes.string,
    values: PropTypes.array,
    parentId: PropTypes.string,
    onChange: PropTypes.func
}
 
export default SelectStatus;