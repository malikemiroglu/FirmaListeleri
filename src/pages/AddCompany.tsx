import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
            await axios.post('https://edsapi-dev.azurewebsites.net/Company/CreateOrUpdate', formData);
            navigate('/sirketler');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium text-gray-700">Firma Adı</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label htmlFor="firstName" className="block font-medium text-gray-700">Firma Sahibi Adı</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block font-medium text-gray-700">Firma Sahibi Soyadı</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label htmlFor="email" className="block font-medium text-gray-700">E-posta</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label htmlFor="mobilePhone" className="block font-medium text-gray-700">Telefon</label>
                    <input type="tel" id="mobilePhone" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <button type="submit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300">Firma Ekle</button>
            </form>
        </div>
    );
}

export default AddCompanyForm;
