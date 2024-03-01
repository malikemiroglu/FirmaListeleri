import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute right-0 flex items-center mr-3 sm:hidden h-16">
                        <button 
                            className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white border border-gray-700"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="block h-6 w-6 text-white" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6 text-white" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-16 w-full z-50 bg-gray-100 sm:hidden">
                            <div className="flex flex-col space-y-4 py-4 px-2">
                                <Link to="/" className={`p-3 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md`} onClick={toggleMobileMenu}> Ana Sayfa </Link>
                                <Link to="/hakkimizda" className={`p-3 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md`} onClick={toggleMobileMenu}>Hakkımızda</Link>
                                <Link to="/sirketler" className={`p-3 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md`} onClick={toggleMobileMenu}>Şirketler</Link>
                            </div>
                        </div>
                    )}
                    {/* End of mobile menu */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to="/">
                                <img className="h-8 w-auto cursor-pointer" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/" className={`px-3 py-2 text-sm font-medium ${location.pathname === '/' ? 'bg-gray-900 text-white rounded-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md'}`}> Ana Sayfa </Link>
                                <Link to="/hakkimizda" className={`px-3 py-2 text-sm font-medium ${location.pathname === '/hakkimizda' ? 'bg-gray-900 text-white rounded-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md'}`}>Hakkımızda</Link>
                                <Link to="/sirketler" className={`px-3 py-2 text-sm font-medium ${location.pathname === '/sirketler' ? 'bg-gray-900 text-white rounded-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md'}`}>Şirketler</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
