import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface Company {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
}

const Detail: React.FC = () => {
    const [company, setCompany] = useState<Company | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://edsapi-dev.azurewebsites.net/Company/GetById?id=${id}`);
                setCompany(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    if (!company) {
        return <div>Loading...</div>;
    }

    console.log(company)

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 w-full">
                            <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                                <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="blog" />
                                <div className="p-6">
                                    <h1 className="title-font text-lg font-medium text-gray-600 mb-3">{company.title}</h1>
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{`${company.firstName} ${company.lastName}`}</h2>
                                    <p className="leading-relaxed mb-3 font-medium">{company.title}</p>
                                    <p className='leading-relaxed mb-3'>{company.email}</p>
                                    <p className='leading-relaxed mb-3'>{company.mobilePhone}</p>
                                    <div className='flex gap-2 ml-auto w-auto'>
                                        <Link to="/sirketler" className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300">
                                            Geri Dön
                                        </Link>
                                        <Link to={`/edit/${company.id}`} className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300">
                                            Düzenle
                                        </Link>
                                        <button className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300">
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Detail;