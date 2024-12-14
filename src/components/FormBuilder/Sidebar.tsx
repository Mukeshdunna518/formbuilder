import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { fieldTypes } from './FieldTypes';

function DraggableItem({ type, label, icon }: typeof fieldTypes[number]) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `type-${type}`,
    data: { type, label },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : undefined,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-move hover:border-indigo-500 transition-colors"
      style={style}
    >
      <div className="mr-3 text-gray-600">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Field Types</h2>
      <div className="space-y-3">
        {fieldTypes.map((field) => (
          <DraggableItem key={field.type} {...field} />
        ))}
      </div>
    </div>
  );
}