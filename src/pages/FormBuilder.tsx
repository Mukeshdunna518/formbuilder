import React, { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent,
  DragOverlay,
  useSensor, 
  useSensors,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
} from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../components/FormBuilder/Sidebar';
import Canvas from '../components/FormBuilder/Canvas';
import FieldProperties from '../components/FormBuilder/FieldProperties';
import FormActions from '../components/FormBuilder/FormActions';
import { useFormStore } from '../store/formStore';
import { fieldTypes } from '../components/FormBuilder/FieldTypes';
import { FormField } from '../types';

export default function FormBuilder() {
  const { addField, createForm } = useFormStore();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Initialize form if not already created
  React.useEffect(() => {
    createForm('Untitled Form', 'Form Description');
  }, [createForm]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    // Clear selected field when starting a new drag
    setSelectedFieldId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.id === 'canvas' && active.data.current) {
      const fieldType = active.data.current.type;
      const fieldTypeConfig = fieldTypes.find(f => f.type === fieldType);
      
      if (fieldTypeConfig) {
        const newField: Partial<FormField> = {
          type: fieldType,
          label: `New ${fieldTypeConfig.label}`,
          required: false,
          placeholder: `Enter ${fieldTypeConfig.label.toLowerCase()}`,
          id: uuidv4(),
        };

        // Add default options for radio and select fields
        if (fieldType === 'radio' || fieldType === 'select') {
          newField.options = ['Option 1', 'Option 2', 'Option 3'];
        }

        addField(newField);
        // Don't automatically select the new field
        // setSelectedFieldId(newField.id);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DndContext 
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <Canvas 
            onFieldSelect={setSelectedFieldId} 
            selectedFieldId={selectedFieldId}
          />
          {selectedFieldId && (
            <FieldProperties 
              fieldId={selectedFieldId} 
              onClose={() => setSelectedFieldId(null)} 
            />
          )}
        </div>
        <DragOverlay>
          {activeId && (
            <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-indigo-500">
              {fieldTypes.find(f => `type-${f.type}` === activeId)?.label}
            </div>
          )}
        </DragOverlay>
      </DndContext>
      <FormActions />
    </div>
  );
}