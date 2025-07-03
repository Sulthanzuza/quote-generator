import React from 'react';

// Utility to format INR currency
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

interface TotalSectionProps {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  onDiscountChange: (value: number) => void;
  onTaxChange: (value: number) => void;
}

const TotalSection: React.FC<TotalSectionProps> = ({ 
  subtotal, 
  discount, 
  tax,
  total,
  onDiscountChange,
  onTaxChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Totals</h2>
      </div>

      <div className="flex flex-col space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-800 font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Discount:</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={discount}
              onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
              className="w-16 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-gray-600 ml-1">%</span>
          </div>
          <span className="text-gray-800 font-medium">
            -{formatCurrency(subtotal * (discount / 100))}
          </span>
        </div>

        {/* Tax (optional, can uncomment if needed) */}
        {/* <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Tax:</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={tax}
              onChange={(e) => onTaxChange(parseFloat(e.target.value) || 0)}
              className="w-16 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-gray-600 ml-1">%</span>
          </div>
          <span className="text-gray-800 font-medium">
            +{formatCurrency(subtotal * (tax / 100))}
          </span>
        </div> */}

        {/* Total */}
        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-blue-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalSection;
