import React from 'react';

interface SubmitButtonProps {
  text: string;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <button 
      type="submit" 
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
