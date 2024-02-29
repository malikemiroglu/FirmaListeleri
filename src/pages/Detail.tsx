import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

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
    const [formData, setFormData] = useState<Company | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://edsapi-dev.azurewebsites.net/Company/GetById?id=${id}`);
                setCompany(response.data.data);
                setFormData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState!,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://edsapi-dev.azurewebsites.net/Company/CreateOrUpdate', formData);
            navigate('/sirketler');
        } catch (error) {
            console.log(error);
        }
    };

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="blog" />
                                    <div className="p-6">
                                        <h1 className="title-font text-lg font-medium text-gray-600 mb-3">Firma Adı</h1>
                                        <input type="text" name="title" value={formData?.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Firma Sahibi Adı Soyadı</h2>
                                        <input type="text" name="firstName" value={formData?.firstName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                        <input type="text" name="lastName" value={formData?.lastName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">E-posta</h2>
                                        <input type="email" name="email" value={formData?.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Telefon</h2>
                                        <input type="tel" name="mobilePhone" value={formData?.mobilePhone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                        <div className="flex gap-2 ml-auto w-auto mt-4">
                                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                                                Güncelle
                                            </button>
                                            <Link to="/sirketler" className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300">
                                                Geri Dön
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Detail;
