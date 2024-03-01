import { Link } from 'react-router-dom'

const AddCompany = () => {
  return (
    <Link to="/sirket-ekle" className="inline-block ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300">
        Şirket Ekle
    </Link>
  )
}

export default AddCompany
