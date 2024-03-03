import React from 'react';

interface TableHeaderWithSortProps {
    text: string;
    onClick: () => void;
}

const TableHeaderWithSort: React.FC<TableHeaderWithSortProps> = ({ text, onClick }) => (
    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left cursor-pointer" onClick={onClick}>
        <div className='flex items-center gap-1'>
            {text}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
        </div>
    </th>
);

export default TableHeaderWithSort;
