import React from 'react';
import { CompanyInfo } from '../types';
import { Building, Phone, Mail, Globe } from 'lucide-react';

interface CompanyInfoProps {
  companyInfo: CompanyInfo;
  onChange: (info: CompanyInfo) => void;
}

const CompanyInfoForm: React.FC<CompanyInfoProps> = ({ companyInfo, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...companyInfo,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <Building className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="name"
            value={companyInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Your Company Name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={companyInfo.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Company Address"
          />
        </div>
        
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="text"
            name="phone"
            value={companyInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Phone Number"
          />
        </div>
        
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="email"
            name="email"
            value={companyInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email Address"
          />
        </div>
        
        <div className="flex items-center md:col-span-2">
          <Globe className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="text"
            name="website"
            value={companyInfo.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Website URL"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoForm;