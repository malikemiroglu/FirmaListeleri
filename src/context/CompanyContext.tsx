import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export type Company = {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    isActive: boolean;
};

export type CompanyContextType = {
    companies: Company[];
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    setTotalPages?: React.Dispatch<React.SetStateAction<number>>;
    error: string | null;
};

const defaultState: CompanyContextType = {
    companies: [],
    setCompanies: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    totalPages: 0,
    setTotalPages: () => {},
    error: null,
};

export const useCompanyContext = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompanyContext, CompanyProvider içinde kullanılmalıdır');
    }
    return context;
};

export const CompanyContext = createContext<CompanyContextType>(defaultState);

type CompanyProviderProps = {
    children: React.ReactNode;
};

export default function CompanyProvider({ children }: CompanyProviderProps) {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/Company/GetAll?pageIndex=${currentPage}&pageSize=8`);
                setCompanies(response.data.data);
                const totalItems = response.data.totalRecord;
                const totalPages = Math.ceil(totalItems / 8);
                setTotalPages(totalPages);
            } catch (error) {
                setError('Veri alınırken bir hata oluştu.');
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage]);

    return (
        <CompanyContext.Provider value={{ companies, setCompanies, totalPages, currentPage, setCurrentPage, setTotalPages, error }}>
            {children}
        </CompanyContext.Provider>
    );
}
