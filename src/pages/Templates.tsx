import React from 'react';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
import { FileText, ShoppingCart, GraduationCap, Calendar, MessageSquare, HelpCircle } from 'lucide-react';
import { useFormStore } from '../store/formStore';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  fields: any[];
}

const templates: Template[] = [
  {
    id: 'customer-registration',
    title: 'New Customer Registration Form',
    description: 'A new customer registration form is a business form that new customers fill out to collect their information.',
    category: 'E-commerce Forms',
    icon: <FileText className="h-6 w-6" />,
    fields: [
      {
        type: 'text',
        label: 'Full Name',
        required: true,
        placeholder: 'Enter your full name',
      },
      {
        type: 'text',
        label: 'Email',
        required: true,
        placeholder: 'Enter your email address',
      },
      {
        type: 'textarea',
        label: 'Address',
        required: true,
        placeholder: 'Enter your address',
      },
    ],
  },
  {
    id: 'product-order',
    title: 'Product Order Form',
    description: 'With our free online product order form template, you can customize and embed it on your website to start selling your products.',
    category: 'E-commerce Forms',
    icon: <ShoppingCart className="h-6 w-6" />,
    fields: [
      {
        type: 'text',
        label: 'Customer Name',
        required: true,
        placeholder: 'Enter your name',
      },
      {
        type: 'select',
        label: 'Product',
        required: true,
        options: ['Product A', 'Product B', 'Product C'],
      },
      {
        type: 'number',
        label: 'Quantity',
        required: true,
        min: 1,
      },
    ],
  },
  {
    id: 'course-registration',
    title: 'Course Registration Form',
    description: 'This Course Registration Form template can be used by any school/institution to accept registration for various educational programs.',
    category: 'Business Forms',
    icon: <GraduationCap className="h-6 w-6" />,
    fields: [
      {
        type: 'text',
        label: 'Student Name',
        required: true,
        placeholder: 'Enter student name',
      },
      {
        type: 'date',
        label: 'Date of Birth',
        required: true,
      },
      {
        type: 'select',
        label: 'Course',
        required: true,
        options: ['Course A', 'Course B', 'Course C'],
      },
    ],
  },
  {
    id: 'appointment-request',
    title: 'Appointment Request Form',
    description: 'An appointment request form is used by medical practices to collect patient information.',
    category: 'Business Forms',
    icon: <Calendar className="h-6 w-6" />,
    fields: [
      {
        type: 'text',
        label: 'Patient Name',
        required: true,
        placeholder: 'Enter your name',
      },
      {
        type: 'date',
        label: 'Preferred Date',
        required: true,
      },
      {
        type: 'textarea',
        label: 'Reason for Visit',
        required: true,
        placeholder: 'Please describe your reason for visit',
      },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback Form',
    description: 'A Feedback Form is a form template designed to gather valuable insights, opinions, and suggestions.',
    category: 'Business Forms',
    icon: <MessageSquare className="h-6 w-6" />,
    fields: [
      {
        type: 'text',
        label: 'Name',
        required: false,
        placeholder: 'Enter your name',
      },
      {
        type: 'radio',
        label: 'Feedback Type',
        required: true,
        options: ['Suggestion', 'Complaint', 'Compliment'],
      },
      {
        type: 'textarea',
        label: 'Your Feedback',
        required: true,
        placeholder: 'Please provide your feedback',
      },
    ],
  },
  {
    id: 'information-request',
    title: 'Information Request Form',
    description: 'An Information Request Form is a versatile form template designed to facilitate the process of requesting specific information.',
    category: 'Customer Service Forms',
    icon: <HelpCircle className="h-6 w-6" />,
    fields: [
      {
        type: 'text',
        label: 'Name',
        required: true,
        placeholder: 'Enter your name',
      },
      {
        type: 'text',
        label: 'Email',
        required: true,
        placeholder: 'Enter your email',
      },
      {
        type: 'textarea',
        label: 'Information Requested',
        required: true,
        placeholder: 'Please describe the information you need',
      },
    ],
  },
];

export default function Templates() {
  const navigate = useNavigate();
  const { createForm } = useFormStore();

  const handleUseTemplate = (template: Template) => {
    createForm(template.title, template.description, template.fields);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Form Templates</h1>
          <p className="text-lg text-gray-600">Choose from our pre-built templates to get started quickly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  {template.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {template.category}
                  </span>
                </div>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}