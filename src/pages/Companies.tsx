import React, { useEffect, useState } from 'react';
import { useCompanyContext } from '../context/CompanyContext';
import axios from 'axios';
import Pagination from '../components/Pagination';
import SearchCompany from '../components/SearchCompany';
import TableHeader from '../components/TableHeader';
import TableHeaderWithSort from '../components/TableHeaderWithSort';
import TableRow from '../components/TableRow';

const Companies: React.FC = () => {
    const { companies, setCompanies } = useCompanyContext();
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
                <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto sm:mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex items-center">
                                <div className="w-full px-4 max-w-full sm:flex-1">
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
                                        <TableHeader text="Firma Adı" />
                                        <TableHeader text="Firma Sahibi Adı" />
                                        <TableHeader text="Firma Sahibi Soyadı" />
                                        <TableHeader text="Firma Ünvanı" />
                                        <TableHeader text="E-posta" />
                                        <TableHeader text="Telefon" />
                                        <TableHeaderWithSort text="Aktif/Pasif" onClick={handleSortByActive} />
                                        <TableHeader text="Görüntele" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCompanies.map((company, index) => (
                                        <TableRow key={company.id} company={company} index={index} />
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
