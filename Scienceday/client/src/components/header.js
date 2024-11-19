import React from "react";
import logoImage from "./logo.png";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b border-orange-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-0">
        <div className="flex items-center space-x-4 group">
          <div className="w-12 h-12 flex items-center justify-center transform transition-transform group-hover:scale-105">
            <img
              src={logoImage}
              alt="IPR"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
              प्लाज्मा अनुसंधान संस्थान
            </h1>
            <h2 className="text-xl font-semibold text-blue-600 tracking-wide">
              Institute for Plasma Research
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
