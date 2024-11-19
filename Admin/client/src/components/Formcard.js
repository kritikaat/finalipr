import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormCard = ({ form }) => {
  const navigate = useNavigate();

  const handleOpenForm = () => {
    navigate(`/form/${form.id}`); // Navigates to the form details page
  };

  return (
    <div className="flex flex-col h-[250px] w-full border border-gray-200 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center pt-4">
        <img
          src={form.svg}
          alt={form.title}
          className="w-20 h-20 object-contain"
        />
      </div>
      
      {/* Title Container */}
      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {form.title}
        </h3>
      </div>

      {/* Button Container */}
      <div className="px-4 pb-4">
        <button
          onClick={handleOpenForm}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Open Form
        </button>
      </div>
    </div>
  );
};

export default FormCard;
