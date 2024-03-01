import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useCompanyContext } from '../context/CompanyContext'; 

const Pagination: React.FC = () => {
    const { currentPage, totalPages, setCurrentPage, setTotalPages } = useCompanyContext(); 

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {/* Önceki sayfa düğmesi */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${
                        currentPage === 1 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        } 
                        relative inline-flex items-center rounded-l-md px-2 py-2`
                    }
                >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Sayfa numaraları düğmeleri */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0'
                            }`
                        }
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Sonraki sayfa düğmesi */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                        currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`
                    }
                >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
