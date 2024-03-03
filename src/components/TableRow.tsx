// TableRow.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../context/CompanyContext';

interface TableRowProps {
    company: Company;
    index: number;
}

const TableRow: React.FC<TableRowProps> = ({ company, index }) => (
    <tr className={`${index % 2 === 0 ? '' : 'bg-gray-200'}`}>
        <td className="text-xs p-4 px-6 text-blueGray-700">
            {company.title}
        </td>
        <td className="text-xs p-4 px-6">
            {company.firstName}
        </td>
        <td className="text-xs p-4 px-6">
            {company.lastName}
        </td>
        <td className="text-xs p-4 px-6">
            {company.title}
        </td>
        <td className="text-xs p-4 px-6">
            {company.email}
        </td>
        <td className="text-xs p-4 px-6">
            {company.mobilePhone}
        </td>
        <td className="text-xs p-4 px-6">
            <div className={`w-3 h-3 rounded-full ${company.isActive ? "bg-green-500" : "bg-red-500"} inline-block mr-2 ml-3 `}>
            </div>
            <span>{company.isActive ? 'Aktif' : 'Pasif'}</span>
        </td>
        <td className="text-xs p-4 px-6 flex justify-center gap-2">
            <Link to={`detail/${company.id}`} className="bg-blue-200 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300">
                Detay
            </Link>
        </td>
    </tr>
);

export default TableRow;
