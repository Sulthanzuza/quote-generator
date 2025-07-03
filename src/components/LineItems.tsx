import React, { useState } from 'react';
import { LineItem } from '../types';
import { getServiceById, getSubServicesByServiceId, services } from '../data/services';
import SubServiceChecklist from './SubServiceChecklist';
import { generateUniqueId, calculateLineItemAmount, formatAED } from '../utils/helpers';
import { Plus, Trash2 } from 'lucide-react';

// Currency formatting utilities
const formatCurrency = (amount: number, currency: 'AED' | 'INR'): string => {
  if (currency === 'AED') {
    return formatAED(amount);
  } else {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

interface LineItemsProps {
  lineItems: LineItem[];
  onChange: (items: LineItem[]) => void;
  currency?: 'AED' | 'INR';
  onCurrencyChange?: (currency: 'AED' | 'INR') => void;
}

const LineItemsComponent: React.FC<LineItemsProps> = ({ 
  lineItems, 
  onChange, 
  currency = 'INR',
onCurrencyChange = undefined

}) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const handleServiceChange = (id: string, serviceId: string) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === id) {
        const service = getServiceById(serviceId);
        return {
          ...item,
          service: serviceId,
          description: service ? service.name : '',
          selectedSubServices: []
        };
      }
      return item;
    });
    onChange(updatedItems);
  };

  const handleSubServiceChange = (id: string, selectedIds: string[]) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === id) {
        // Get the service
        const service = getServiceById(item.service);
        
        // Create a new description that includes the selected sub-services
        const selectedSubServices = service?.subServices.filter(sub => 
          selectedIds.includes(sub.id)
        ) || [];
        
        const subServiceNames = selectedSubServices.map(sub => sub.name).join(', ');
        const description = service ? `${service.name}${subServiceNames ? `: ${subServiceNames}` : ''}` : '';
        
        return {
          ...item,
          description,
          selectedSubServices: selectedIds
        };
      }
      return item;
    });
    onChange(updatedItems);
  };

  const handleQuantityChange = (id: string, value: number) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === id) {
        const amount = calculateLineItemAmount(value, item.rate);
        return { ...item, quantity: value, amount };
      }
      return item;
    });
    onChange(updatedItems);
  };

  const handleRateChange = (id: string, value: number) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === id) {
        const amount = calculateLineItemAmount(item.quantity, value);
        return { ...item, rate: value, amount };
      }
      return item;
    });
    onChange(updatedItems);
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: generateUniqueId(),
      service: '',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      selectedSubServices: []
    };
    onChange([...lineItems, newItem]);
    setExpandedItemId(newItem.id);
  };

  const removeLineItem = (id: string) => {
    onChange(lineItems.filter(item => item.id !== id));
    if (expandedItemId === id) {
      setExpandedItemId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleCurrencyChange = (newCurrency: 'AED' | 'INR') => {
    if (onCurrencyChange) {
      onCurrencyChange(newCurrency);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Line Items</h2>
        {onCurrencyChange && (
  <div className="flex items-center space-x-2">
    <label className="text-sm font-medium text-gray-700">Currency:</label>
    <select
      value={currency}
      onChange={(e) => handleCurrencyChange(e.target.value as 'AED' | 'INR')}
      className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="INR">INR (₹)</option>
      <option value="AED">AED (د.إ)</option>
    </select>
  </div>
)}

      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                Service & Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Rate ({currency})
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Amount ({currency})
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lineItems.map((item) => (
              <React.Fragment key={item.id}>
                <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleExpand(item.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <select
                        value={item.service}
                        onChange={(e) => handleServiceChange(item.id, e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {item.description && (
                        <div
                          className="text-sm text-gray-600 mt-1 break-words"
                          style={{ maxWidth: '10cm', whiteSpace: 'pre-line' }}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => handleRateChange(item.id, parseFloat(e.target.value) || 0)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                      placeholder={`0.00 ${currency}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(item.amount, currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLineItem(item.id);
                      }}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
                {expandedItemId === item.id && item.service && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4">
                      <SubServiceChecklist
                        subServices={getSubServicesByServiceId(item.service)}
                        selectedSubServices={item.selectedSubServices}
                        onSubServiceChange={(ids) => handleSubServiceChange(item.id, ids)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <button
          type="button"
          onClick={addLineItem}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>
    </div>
  );
};

export default LineItemsComponent;