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
    isActive: boolean;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState!,
            [name]: name === 'isActive' ? value === 'true' : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://edsapi-dev.azurewebsites.net/Company/CreateOrUpdate', formData);

            await axios.post('https://edsapi-dev.azurewebsites.net/Company/ChangeIsActive', {
                id: formData?.id,
                isActive: formData?.isActive
            });

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
                                    <div className="p-6 flex flex-col gap-3">
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">Firma Adı</h1>
                                            <input type="text" name="title" value={formData?.title} onChange={handleChange} className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-base font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0" />
                                        </div>
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">Firma Sahibi Adı</h1>
                                            <input type="text" name="firstName" value={formData?.firstName} onChange={handleChange} className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-base font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 " />
                                        </div>
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">Firma Sahibi Soyadı</h1>
                                            <input type="text" name="lastName" value={formData?.lastName} onChange={handleChange} className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-base font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 " />
                                        </div>
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">Firma Ünvanı</h1>
                                            <input type="text" name="title" value={formData?.title} onChange={handleChange} className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-base font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 " />
                                        </div>
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">E-posta</h1>
                                            <input type="email" name="email" value={formData?.email} onChange={handleChange} className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-base font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 " />
                                        </div>
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">Telefon</h1>
                                            <input type="tel" name="mobilePhone" value={formData?.mobilePhone} onChange={handleChange} className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-base font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 " />
                                        </div>
                                        <div>
                                            <h1 className=" text-base title-font font-medium text-gray-400 mb-1">Durum</h1>
                                            <select 
                                                name='isActive' 
                                                value={formData?.isActive ? 'true' : 'false'} 
                                                onChange={handleChange} 
                                                className="h-full w-20 border-b bg-transparent py-1.5 font-sans text-base font-normal outline-0 transition-all focus:border-gray-900 "
                                            >
                                                <option value="true">Aktif</option>
                                                <option value="false">Pasif</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2 ml-auto w-auto mt-6">
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
