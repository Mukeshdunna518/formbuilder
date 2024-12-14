import React from 'react';
import { Save, X, Download } from 'lucide-react';
import { useFormStore } from '../../store/formStore';
import { useNavigate } from 'react-router-dom';

export default function FormActions() {
  const { saveForm, currentForm, resetForm } = useFormStore();
  const navigate = useNavigate();

  const handleSave = () => {
    if (!currentForm?.title) {
      alert('Please add a title to your form before saving');
      return;
    }
    saveForm();
    navigate('/my-forms');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      resetForm();
      navigate('/');
    }
  };

  const handleDownload = () => {
    if (!currentForm) return;
    
    const formData = JSON.stringify(currentForm, null, 2);
    const blob = new Blob([formData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentForm.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end space-x-4">
      <button
        onClick={handleDownload}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        disabled={!currentForm}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </button>
      <button
        onClick={handleCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
      >
        <X className="h-4 w-4 mr-2" />
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Form
      </button>
    </div>
  );
}