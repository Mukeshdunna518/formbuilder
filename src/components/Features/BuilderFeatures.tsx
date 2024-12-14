import React from 'react';
import { 
  Layout, 
  MousePointer, 
  Move, 
  Maximize, 
  Palette, 
  Settings, 
  Smartphone 
} from 'lucide-react';

export default function BuilderFeatures() {
  const features = [
    {
      icon: <MousePointer className="h-6 w-6 text-indigo-600" />,
      title: "Intuitive Drag & Drop",
      description: "Simply drag form elements onto your canvas. Rearrange them with ease to create the perfect layout for your needs."
    },
    {
      icon: <Move className="h-6 w-6 text-indigo-600" />,
      title: "Field Reordering",
      description: "Easily reorganize your form fields by dragging them to new positions, ensuring a logical flow for your users."
    },
    {
      icon: <Maximize className="h-6 w-6 text-indigo-600" />,
      title: "Resizable Fields",
      description: "Customize the size of your form fields by dragging the edges or corners to achieve the perfect dimensions."
    },
    {
      icon: <Palette className="h-6 w-6 text-indigo-600" />,
      title: "Rich Styling Options",
      description: "Customize fonts, colors, sizes, and alignments to match your brand and create visually appealing forms."
    },
    {
      icon: <Settings className="h-6 w-6 text-indigo-600" />,
      title: "Advanced Field Properties",
      description: "Configure validation rules, placeholder text, help messages, and other field-specific settings with ease."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-indigo-600" />,
      title: "Responsive Design",
      description: "Forms automatically adapt to different screen sizes, ensuring a great experience on desktop and mobile devices."
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <Layout className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Drag-and-Drop Form Builder</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Create professional forms in minutes with our intuitive drag-and-drop interface. 
          No coding required - just drag, drop, and customize to your heart's content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}