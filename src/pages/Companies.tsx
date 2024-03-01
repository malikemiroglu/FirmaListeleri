import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompanyContext } from '../context/CompanyContext';
import axios from 'axios';
import Pagination from '../components/Pagination';
import SearchCompany from '../components/SearchCompany';

const Companies: React.FC = () => {
    const { companies, setCompanies, setCurrentPage, currentPage } = useCompanyContext();
    const [sortByActive, setSortByActive] = useState<boolean | null>(false);
    const [clickCount, setClickCount] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('title,email');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/Company/GetAll?searchBy=${searchBy}&searchText=${searchText}`);
            setCompanies(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchText(value);
        if (value === '') {
            window.location.reload();
        }
    };

    useEffect(() => {
        setSortByActive(null);
    }, []);

    const handleSortByActive = () => {
        setClickCount(prevClickCount => prevClickCount + 1);

        if (clickCount % 3 === 0) {
            setSortByActive(null);
        } else {
            setSortByActive(prevSortByActive => {
                return prevSortByActive === null ? true : !prevSortByActive;
            });
        }

        if (clickCount % 3 === 0 && clickCount !== 0) {
            setClickCount(1);
        }
    }

    const sortedCompanies = [...companies].sort((a, b) => {
        if (sortByActive === true) {
            return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
        } else if (sortByActive === false) {
            return a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1;
        } else {
            return 0;
        }
    });

    return (
        <>
        <section className="py-1">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base">Şirketler</h3>
                            </div>
                            <SearchCompany 
                                searchText={searchText} 
                                handleInputChange={handleInputChange} 
                                searchBy={searchBy} 
                                setSearchBy={setSearchBy} 
                                handleSearch={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        Firma Adı
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        Firma Sahibi Adı
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        Firma Sahibi Soyadı
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        Firma Ünvanı
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        e-posta
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        Telefon
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" onClick={() => handleSortByActive()}>
                                        <div className='flex items-center gap-1'>
                                            Aktif/Pasif
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-center">
                                        Görüntele
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedCompanies.map((company, index) => (
                                    <tr key={company.id} className={`${index % 2 === 0 ? '' : 'bg-gray-200'}`}>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <Pagination />
        </>
    )
}

export default Companies;
