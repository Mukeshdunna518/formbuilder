import React from 'react';
import { FormField } from '../../types';

interface FormFieldRendererProps {
  field: FormField;
  preview?: boolean;
  onSelect?: () => void;
}

export default function FormFieldRenderer({ field, preview = false, onSelect }: FormFieldRendererProps) {
  const commonProps = {
    id: field.id,
    name: field.id,
    required: field.required,
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    onClick: onSelect,
    style: { 
      width: field.width || '100%',
      height: field.height,
    },
    'aria-describedby': field.helpText ? `${field.id}-description` : undefined,
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...commonProps}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            pattern={field.validation?.pattern}
          />
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            rows={field.rows || 3}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            style={{ ...commonProps.style, resize: 'none' }}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.validation?.step}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            {...commonProps}
            defaultValue={field.defaultValue}
            min={field.validation?.minDate}
            max={field.validation?.maxDate}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...commonProps}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              defaultChecked={field.defaultChecked}
            />
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${index}`}
                  name={field.id}
                  value={option}
                  defaultChecked={field.defaultValue === option}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`${field.id}-${index}`} className="ml-2 block text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            {...commonProps}
            defaultValue={field.defaultValue}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-gray-700"
        style={{
          fontSize: field.labelSizePixel ? `${field.labelSizePixel}px` : '14px',
          fontStyle: field.labelFontStyle?.includes('italic') ? 'italic' : 'normal',
          fontWeight: field.labelFontStyle?.includes('bold') ? 'bold' : 'normal',
          textAlign: field.labelAlignment || 'left',
          color: field.labelColor || '#000000',
        }}
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.helpText && (
        <p className="text-sm text-gray-500" id={`${field.id}-description`}>
          {field.helpText}
        </p>
      )}
      {renderField()}
    </div>
  );
}