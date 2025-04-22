import React from 'react';
import { AlignLeft } from 'lucide-react';

interface NotesSectionProps {
  notes: string;
  onChange: (notes: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <AlignLeft className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Notes</h2>
      </div>
      
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Add any additional notes, terms, or conditions here..."
      />
    </div>
  );
};

export default NotesSection;