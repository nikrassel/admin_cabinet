import React from 'react';
import PropTypes from "prop-types"

const TableHeader = ({ columns }) => {
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        scope="col"
                        className=''
                    >
                        {columns[column]?.name && columns[column].name}
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