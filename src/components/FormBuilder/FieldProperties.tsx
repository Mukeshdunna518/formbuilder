import React from 'react';
import { useFormStore } from '../../store/formStore';
import { FormField } from '../../types';
import SlidePanel from './SlidePanel';

interface FieldPropertiesProps {
  fieldId: string | null;
  onClose: () => void;
}

const fontStyles = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'boldItalic', label: 'Bold Italic' },
];

const alignments = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export default function FieldProperties({ fieldId, onClose }: FieldPropertiesProps) {
  const { currentForm, updateField } = useFormStore();
  const field = currentForm?.fields.find((f) => f.id === fieldId);

  const handleChange = (key: keyof FormField, value: any) => {
    if (field) {
      updateField(field.id, { [key]: value });
    }
  };

  const renderCommonProperties = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Label <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={field?.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Help Text
        </label>
        <input
          type="text"
          value={field?.helpText || ''}
          onChange={(e) => handleChange('helpText', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter help text for this field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Label Size (px) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={field?.labelSizePixel || 14}
          onChange={(e) => handleChange('labelSizePixel', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="8"
          max="72"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Label Font Style <span className="text-red-500">*</span>
        </label>
        <select
          value={field?.labelFontStyle || 'normal'}
          onChange={(e) => handleChange('labelFontStyle', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {fontStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Label Alignment <span className="text-red-500">*</span>
        </label>
        <select
          value={field?.labelAlignment || 'left'}
          onChange={(e) => handleChange('labelAlignment', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {alignments.map((alignment) => (
            <option key={alignment.value} value={alignment.value}>
              {alignment.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Label Color
        </label>
        <input
          type="color"
          value={field?.labelColor || '#000000'}
          onChange={(e) => handleChange('labelColor', e.target.value)}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={field?.required || false}
          onChange={(e) => handleChange('required', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
          Required field
        </label>
      </div>
    </>
  );

  const renderTextFieldProperties = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Placeholder
        </label>
        <input
          type="text"
          value={field?.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Default Value
        </label>
        <input
          type="text"
          value={field?.defaultValue || ''}
          onChange={(e) => handleChange('defaultValue', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Length
        </label>
        <input
          type="number"
          value={field?.validation?.minLength || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            minLength: e.target.value ? parseInt(e.target.value) : undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Length
        </label>
        <input
          type="number"
          value={field?.validation?.maxLength || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            maxLength: e.target.value ? parseInt(e.target.value) : undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
        />
      </div>
    </>
  );

  const renderTextareaProperties = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Placeholder
        </label>
        <input
          type="text"
          value={field?.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Rows
        </label>
        <input
          type="number"
          value={field?.rows || 3}
          onChange={(e) => handleChange('rows', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="2"
          max="20"
        />
      </div>
    </>
  );

  const renderNumberProperties = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Value
        </label>
        <input
          type="number"
          value={field?.validation?.min || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            min: e.target.value ? parseInt(e.target.value) : undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Value
        </label>
        <input
          type="number"
          value={field?.validation?.max || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            max: e.target.value ? parseInt(e.target.value) : undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Step
        </label>
        <input
          type="number"
          value={field?.validation?.step || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            step: e.target.value ? parseFloat(e.target.value) : undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
          step="0.01"
        />
      </div>
    </>
  );

  const renderDateProperties = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Date
        </label>
        <input
          type="date"
          value={field?.validation?.minDate || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            minDate: e.target.value || undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Date
        </label>
        <input
          type="date"
          value={field?.validation?.maxDate || ''}
          onChange={(e) => handleChange('validation', { 
            ...field?.validation,
            maxDate: e.target.value || undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </>
  );

  const renderChoiceProperties = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Options <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 space-y-2">
          {(field?.options || []).map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(field?.options || [])];
                  newOptions[index] = e.target.value;
                  handleChange('options', newOptions);
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => {
                  const newOptions = field?.options?.filter((_, i) => i !== index);
                  handleChange('options', newOptions);
                }}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newOptions = [...(field?.options || []), ''];
              handleChange('options', newOptions);
            }}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            + Add Option
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="allowOther"
          checked={field?.allowOther || false}
          onChange={(e) => handleChange('allowOther', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="allowOther" className="ml-2 block text-sm text-gray-900">
          Allow "Other" option
        </label>
      </div>
    </>
  );

  const renderFieldSpecificProperties = () => {
    if (!field) return null;

    switch (field.type) {
      case 'text':
        return renderTextFieldProperties();
      case 'textarea':
        return renderTextareaProperties();
      case 'number':
        return renderNumberProperties();
      case 'date':
        return renderDateProperties();
      case 'radio':
      case 'select':
        return renderChoiceProperties();
      default:
        return null;
    }
  };

  return (
    <SlidePanel
      isOpen={!!fieldId}
      onClose={onClose}
      title="Field Properties"
    >
      {field ? (
        <div className="space-y-6 p-4">
          <div className="space-y-4">
            {renderCommonProperties()}
            {renderFieldSpecificProperties()}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Select a field to edit its properties
        </div>
      )}
    </SlidePanel>
  );
}