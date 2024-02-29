import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="myCustomHeight flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">404 Sayfa Bulunamadı</h2>
                <p className="text-lg text-gray-700 text-center">Üzgünüz, aradığınız sayfayı bulamadık.</p>
                <Link to="/" className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none">
                    Ana Sayfaya Git
                </Link>
            </div>
        </div>
    );
};

export default NotFound;