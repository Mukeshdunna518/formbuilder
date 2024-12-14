import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormField } from '../types';

interface FormStore {
  currentForm: Form | null;
  savedForms: Form[];
  createForm: (title: string, description: string, fields?: FormField[]) => void;
  updateFormDetails: (updates: Partial<Pick<Form, 'title' | 'description'>>) => void;
  addField: (field: Omit<FormField, 'id'>) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  reorderFields: (startIndex: number, endIndex: number) => void;
  saveForm: () => void;
  loadForm: (formId: string) => void;
  deleteForm: (formId: string) => void;
  duplicateForm: (formId: string) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      currentForm: null,
      savedForms: [],
      createForm: (title, description, fields = []) => {
        set({
          currentForm: {
            id: uuidv4(),
            title,
            description,
            fields: fields.map(field => ({ ...field, id: uuidv4() })),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      },
      updateFormDetails: (updates) => {
        set((state) => ({
          currentForm: state.currentForm
            ? {
                ...state.currentForm,
                ...updates,
                updatedAt: new Date(),
              }
            : null,
        }));
      },
      addField: (field) => {
        set((state) => ({
          currentForm: state.currentForm
            ? {
                ...state.currentForm,
                fields: [...state.currentForm.fields, { ...field, id: uuidv4() }],
                updatedAt: new Date(),
              }
            : null,
        }));
      },
      updateField: (id, field) => {
        set((state) => ({
          currentForm: state.currentForm
            ? {
                ...state.currentForm,
                fields: state.currentForm.fields.map((f) =>
                  f.id === id ? { ...f, ...field } : f
                ),
                updatedAt: new Date(),
              }
            : null,
        }));
      },
      deleteField: (id) => {
        set((state) => ({
          currentForm: state.currentForm
            ? {
                ...state.currentForm,
                fields: state.currentForm.fields.filter((f) => f.id !== id),
                updatedAt: new Date(),
              }
            : null,
        }));
      },
      reorderFields: (startIndex, endIndex) => {
        set((state) => {
          if (!state.currentForm) return state;
          const fields = [...state.currentForm.fields];
          const [removed] = fields.splice(startIndex, 1);
          fields.splice(endIndex, 0, removed);
          return {
            currentForm: {
              ...state.currentForm,
              fields,
              updatedAt: new Date(),
            },
          };
        });
      },
      saveForm: () => {
        const { currentForm, savedForms } = get();
        if (!currentForm) return;

        const updatedForms = savedForms.map(form => 
          form.id === currentForm.id ? currentForm : form
        );

        if (!savedForms.find(form => form.id === currentForm.id)) {
          updatedForms.push(currentForm);
        }

        set({ savedForms: updatedForms });
      },
      loadForm: (formId) => {
        const { savedForms } = get();
        const form = savedForms.find(f => f.id === formId);
        if (form) {
          set({ currentForm: { ...form } });
        }
      },
      deleteForm: (formId) => {
        set((state) => ({
          savedForms: state.savedForms.filter(f => f.id !== formId),
        }));
      },
      duplicateForm: (formId) => {
        const { savedForms } = get();
        const form = savedForms.find(f => f.id === formId);
        if (form) {
          const newForm = {
            ...form,
            id: uuidv4(),
            title: `${form.title} (Copy)`,
            fields: form.fields.map(field => ({ ...field, id: uuidv4() })),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set((state) => ({
            savedForms: [...state.savedForms, newForm],
          }));
        }
      },
      resetForm: () => {
        set({ currentForm: null });
      },
    }),
    {
      name: 'form-store',
    }
  )
);