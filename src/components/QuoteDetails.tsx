import React from 'react';
import { CalendarDays } from 'lucide-react';

interface QuoteDetailsProps {
  quoteNumber: string;
  date: string;
  validUntil: string;
  onDateChange: (date: string) => void;
  onValidUntilChange: (date: string) => void;
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ 
  quoteNumber, 
  date, 
  validUntil,
  onDateChange,
  onValidUntilChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <CalendarDays className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Quote Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quote Number
          </label>
          <input
            type="text"
            value={quoteNumber}
            readOnly
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none text-gray-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valid Until
          </label>
          <input
            type="date"
            value={validUntil}
            onChange={(e) => onValidUntilChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;