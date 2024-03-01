import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TurnBackButton from '../components/TurnBackButton';
import SubmitButton from '../components/SubmitButton';

const AddCompanyForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        mobilePhone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/Company/CreateOrUpdate`, formData);
            navigate('/sirketler');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="p-8 border border-gray-200 max-w-lg mx-auto mt-7 shadow-lg rounded">
                <h1 className="font-medium text-3xl">Firma Ekle</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="name" className="text-sm text-gray-700 block mb-1 font-medium">Firma Adı</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="text-sm text-gray-700 block mb-1 font-medium">Firma Sahibi Adı</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="text-sm text-gray-700 block mb-1 font-medium">Firma Sahibi Soyadı</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label htmlFor="title" className="text-sm text-gray-700 block mb-1 font-medium">Firma Ünvanı</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Title" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm text-gray-700 block mb-1 font-medium">Email Adress</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="yourmail@provider.com" />
                        </div>
                        <div>
                            <label htmlFor="job" className="text-sm text-gray-700 block mb-1 font-medium">Telefon</label>
                            <input type="tel" name="mobilePhone" id="mobilePhone" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" value={formData.mobilePhone} onChange={handleChange} required placeholder='Your Number' />
                        </div>
                    </div>
                    <div className="flex gap-2 ml-auto w-auto mt-6">
                        <SubmitButton text={"Firma Ekle"}/>
                        <TurnBackButton />
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCompanyForm;
