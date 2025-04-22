import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Professional Quote Builder</h1>
        </div>
        <div className="text-sm text-gray-500">Create beautiful, detailed quotes for your clients</div>
      </div>
    </header>
  );
};

export default Header;