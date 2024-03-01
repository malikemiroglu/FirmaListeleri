import React, { ChangeEvent } from 'react';
import AddCompany from './AddCompany';

interface Props {
    searchText: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchBy: string;
    setSearchBy: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
}

const SearchCompany: React.FC<Props> = ({ searchText, handleInputChange, searchBy, setSearchBy, handleSearch }) => {
    return (
        <div className="w-full px-4 max-w-full flex-grow flex-1 text-right">
            <input
                type="text"
                placeholder="Firma adı veya e-postaya göre ara"
                value={searchText}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-md  mr-3 w-[300px]"
            />
            <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md  mr-3"
            >
                <option value="title,email">Title & Email</option>
                <option value="title">Title</option>
                <option value="email">Email</option>
            </select>
            <button onClick={handleSearch} className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                Ara
            </button>

            <AddCompany />
        </div>
    )
}

export default SearchCompany;
