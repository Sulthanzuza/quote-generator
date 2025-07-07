// src/components/Header.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Professional Quote Builder</h1>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Quote Generator
          </Link>
          <Link
            to="/invoice"
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/invoice' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Invoice Generator
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
