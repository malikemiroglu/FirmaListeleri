import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Company {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    isActive: boolean;
}

const Companys: React.FC = () => {
    const [companys, setCompanys] = useState<Company[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://edsapi-dev.azurewebsites.net/Company/GetAll');
                setCompanys(response.data.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

    }, []);

    return (
        <section className="py-1">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base">Şirketler</h3>
                            </div>
                            <div className="w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <Link to="/sirket-ekle" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                                    Şirket Ekle
                                </Link>
                            </div>
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
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left">
                                        Aktif/Pasif
                                    </th>
                                    <th className="px-6 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-center">
                                        Görüntele
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {companys.map(company => (
                                    <tr key={company.id} className={`${company.isActive ? '' : 'bg-gray-200'}`}>
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
    )
}

export default Companys;
