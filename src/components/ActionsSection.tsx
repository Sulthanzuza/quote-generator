import React from 'react';
import { DownloadCloud, Save, Trash } from 'lucide-react';

interface ActionsSectionProps {
  onSave: () => void;
  onReset: () => void;
  onDownloadPdf: () => void;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ onSave, onReset, onDownloadPdf }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <Trash className="h-4 w-4 mr-2" />
          Reset Form
        </button>
      </div>
      
      <button
        type="button"
        onClick={onDownloadPdf}
        className="inline-flex items-center px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <DownloadCloud className="h-4 w-4 mr-2" />
        Download PDF
      </button>
    </div>
  );
};

export default ActionsSection;