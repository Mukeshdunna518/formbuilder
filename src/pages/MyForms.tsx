import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, Copy } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useFormStore } from '../store/formStore';

export default function MyForms() {
  const { savedForms, loadForm, deleteForm, duplicateForm } = useFormStore();
  const navigate = useNavigate();

  const handleEdit = (formId: string) => {
    loadForm(formId);
    navigate('/builder');
  };

  const handlePreview = (formId: string) => {
    navigate(`/preview/${formId}`);
  };

  const handleDuplicate = (formId: string) => {
    duplicateForm(formId);
  };

  const handleDelete = (formId: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      deleteForm(formId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Forms</h1>
          <button
            onClick={() => navigate('/builder')}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Create New Form
          </button>
        </div>

        {savedForms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't created any forms yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {savedForms.map((form) => (
                <li key={form.id}>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{form.title}</h3>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(form.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handlePreview(form.id)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                        title="Preview"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(form.id)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(form.id)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                        title="Duplicate"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}