import React from 'react';
import { ClientInfo } from '../types';
import { User, Building2, MapPin, Phone, Mail } from 'lucide-react';

interface ClientInfoProps {
  clientInfo: ClientInfo;
  onChange: (info: ClientInfo) => void;
}

const ClientInfoForm: React.FC<ClientInfoProps> = ({ clientInfo, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...clientInfo,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <User className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Client Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            name="name"
            value={clientInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Client's Full Name"
          />
        </div>
        
        <div className="flex items-center">
          <Building2 className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="text"
            name="company"
            value={clientInfo.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Client's Company"
          />
        </div>
        
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="text"
            name="address"
            value={clientInfo.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Client's Address"
          />
        </div>
        
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="text"
            name="phone"
            value={clientInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Client's Phone"
          />
        </div>
        
        <div className="flex items-center md:col-span-2">
          <Mail className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="email"
            name="email"
            value={clientInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Client's Email"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfoForm;