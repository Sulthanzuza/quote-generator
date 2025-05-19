import React from 'react';
import { SubService } from '../types';

interface SubServiceChecklistProps {
  subServices: SubService[];
  selectedSubServices: string[];
  onSubServiceChange: (selectedIds: string[]) => void;
}

const SubServiceChecklist: React.FC<SubServiceChecklistProps> = ({
  subServices,
  selectedSubServices,
  onSubServiceChange,
}) => {
  const handleCheckboxChange = (id: string) => {
    const updatedSelection = selectedSubServices.includes(id)
      ? selectedSubServices.filter(item => item !== id)
      : [...selectedSubServices, id];
    
    onSubServiceChange(updatedSelection);
  };

  if (subServices.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-md p-3 mt-2 border border-gray-200 max-h-60 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {subServices.map((subService) => (
          <div key={subService.id} className="flex items-center">
            <input
              type="checkbox"
              id={subService.id}
              checked={selectedSubServices.includes(subService.id)}
              onChange={() => handleCheckboxChange(subService.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200 cursor-pointer"
            />
            <label
              htmlFor={subService.id}
              className="ml-2 block text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
            >
              {subService.name}
             
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubServiceChecklist;