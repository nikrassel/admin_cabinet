import React from 'react';
import PropTypes from "prop-types"

const TableBody = ({ data, columns }) => {
    function renderContent(item, column) {
        if (columns[column].component) {
            const component = columns[column].component
            if (typeof component === "function") {
                return component(item)
            }
            return component
        }
        return item[columns[column].path]
    }
    return (
        <tbody>
            {Object.values(data).map((item) => (
                <tr key={item.id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

TableBody.propTypes = {
    data: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableBody;