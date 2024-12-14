import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';
import { useFormStore } from '../../store/formStore';
import FormFieldRenderer from './FormField';
import ResizableField from './ResizableField';

interface CanvasProps {
  onFieldSelect: (fieldId: string | null) => void;
  selectedFieldId: string | null;
}

export default function Canvas({ onFieldSelect, selectedFieldId }: CanvasProps) {
  const { currentForm, updateFormDetails, deleteField } = useFormStore();
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormDetails({ title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormDetails({ description: e.target.value });
  };

  const handleFieldClick = (fieldId: string) => {
    onFieldSelect(fieldId);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div 
        ref={setNodeRef} 
        className={`flex-1 p-6 bg-gray-50 overflow-y-auto ${
          isOver ? 'bg-indigo-50 border-2 border-dashed border-indigo-500' : ''
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <input
              type="text"
              placeholder="Form Title"
              className="text-2xl font-bold w-full border-none focus:outline-none focus:ring-0"
              value={currentForm?.title || ''}
              onChange={handleTitleChange}
            />
            <textarea
              placeholder="Form Description"
              className="mt-2 w-full text-gray-600 border-none focus:outline-none focus:ring-0 resize-none"
              value={currentForm?.description || ''}
              onChange={handleDescriptionChange}
              rows={3}
            />
            <div className="mt-8 space-y-4">
              {currentForm?.fields.map((field) => (
                <ResizableField
                  key={field.id}
                  fieldId={field.id}
                  isSelected={selectedFieldId === field.id}
                >
                  <div
                    onClick={() => handleFieldClick(field.id)}
                    className={`p-4 bg-white border rounded-lg transition-colors group cursor-pointer ${
                      selectedFieldId === field.id
                        ? 'border-indigo-500 ring-1 ring-indigo-500'
                        : 'border-gray-200 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <FormFieldRenderer field={field} preview={true} />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteField(field.id);
                          if (selectedFieldId === field.id) {
                            onFieldSelect(null);
                          }
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                        aria-label="Delete field"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </ResizableField>
              ))}
              {(!currentForm?.fields || currentForm.fields.length === 0) && (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  Drag and drop fields here to build your form
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}