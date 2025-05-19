import React from 'react';
import { Building, Phone, Mail, Globe, MapPin } from 'lucide-react';

const CompanyInfoForm: React.FC = () => {
  const companyInfo = {
    name: 'Aieera Digital Marketing',
    phone: '+971 54 545 8167',
    email: 'hello@aieera.com',
    website: 'https://www.aieera.com',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <Building className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
      </div>

      <div className="text-sm text-gray-700 space-y-4">
        <div className="flex items-center">
          <Building className="h-4 w-4 text-gray-500 mr-2" />
          <span><strong>Name:</strong> {companyInfo.name}</span>
        </div>
      
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gray-500 mr-2" />
          <span><strong>Phone:</strong> {companyInfo.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-gray-500 mr-2" />
          <span><strong>Email:</strong> {companyInfo.email}</span>
        </div>
        <div className="flex items-center">
          <Globe className="h-4 w-4 text-gray-500 mr-2" />
          <span><strong>Website:</strong> <a href={companyInfo.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{companyInfo.website}</a></span>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
