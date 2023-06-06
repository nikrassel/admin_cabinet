import React from 'react';
import PropTypes from "prop-types"

const TableHeader = ({ columns, onSort, selectedSort }) => {
    function handleSort(item) {
        if (selectedSort.path === item && selectedSort.order === "asc") {
            onSort({ path: item, order: "desc" })
        } else {
            onSort({ path: item, order: "asc" })
        }
    }
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        scope="col"
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        role={
                            columns[column].path
                                ? "button"
                                : undefined
                        }
                    >
                        {columns[column]?.name && columns[column].name}
                        {columns[column]?.name && (
                            <i
                                className={
                                    "bi bi-caret-" +
                                    (selectedSort.order === "asc"
                                        ? "up-fill"
                                        : "down-fill")
                                }
                            ></i>)}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    columns: PropTypes.object
}
 
export default TableHeader;