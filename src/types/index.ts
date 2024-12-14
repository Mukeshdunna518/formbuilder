export type BaseFieldProperties = {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'checkbox' | 'radio' | 'select';
  label: string;
  required: boolean;
  helpText?: string;
  labelSizePixel?: number;
  labelFontStyle?: 'normal' | 'bold' | 'italic' | 'boldItalic';
  labelAlignment?: 'left' | 'center' | 'right';
  labelColor?: string;
  width?: string;
  height?: string;
};

export type TextFieldProperties = BaseFieldProperties & {
  type: 'text';
  placeholder?: string;
  defaultValue?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
};

export type TextareaFieldProperties = BaseFieldProperties & {
  type: 'textarea';
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
};

export type NumberFieldProperties = BaseFieldProperties & {
  type: 'number';
  placeholder?: string;
  defaultValue?: number;
  validation?: {
    min?: number;
    max?: number;
    step?: number;
  };
};

export type DateFieldProperties = BaseFieldProperties & {
  type: 'date';
  defaultValue?: string;
  validation?: {
    minDate?: string;
    maxDate?: string;
  };
};

export type CheckboxFieldProperties = BaseFieldProperties & {
  type: 'checkbox';
  defaultChecked?: boolean;
};

export type ChoiceFieldProperties = BaseFieldProperties & {
  type: 'radio' | 'select';
  options: string[];
  defaultValue?: string;
  allowOther?: boolean;
};

export type FormField =
  | TextFieldProperties
  | TextareaFieldProperties
  | NumberFieldProperties
  | DateFieldProperties
  | CheckboxFieldProperties
  | ChoiceFieldProperties;

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
}