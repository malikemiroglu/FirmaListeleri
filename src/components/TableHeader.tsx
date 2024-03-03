import React from 'react';

interface TableHeaderProps {
    text: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ text }) => (
    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
        {text}
    </th>
);

export default TableHeader;
