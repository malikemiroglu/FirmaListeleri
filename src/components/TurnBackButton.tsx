import React from 'react'
import { Link } from 'react-router-dom'

const TurnBackButton:React.FC = () => {
    return (
        <Link to="/sirketler" className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300">
            Geri Dön
        </Link>
    )
}

export default TurnBackButton
