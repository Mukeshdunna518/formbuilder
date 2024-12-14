import React from 'react';
import { Type, AlignLeft, Hash, Calendar, CheckSquare, List, ListChecks } from 'lucide-react';

export const fieldTypes = [
  {
    type: 'text',
    label: 'Text Input',
    icon: <Type className="h-5 w-5" />,
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: <AlignLeft className="h-5 w-5" />,
  },
  {
    type: 'number',
    label: 'Number',
    icon: <Hash className="h-5 w-5" />,
  },
  {
    type: 'date',
    label: 'Date',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    type: 'radio',
    label: 'Radio',
    icon: <List className="h-5 w-5" />,
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: <ListChecks className="h-5 w-5" />,
  },
] as const;