import React from 'react';
import { Share2, Link, Code, Globe, Lock, Users } from 'lucide-react';

export default function SharingFeatures() {
  const features = [
    {
      icon: <Link className="h-6 w-6 text-indigo-600" />,
      title: "Shareable Links",
      description: "Generate unique links to share your forms instantly with anyone, anywhere. Perfect for social media, email, or messaging."
    },
    {
      icon: <Code className="h-6 w-6 text-indigo-600" />,
      title: "Embed Code",
      description: "Easily embed your forms directly into your website or blog using our simple embed code generator."
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      title: "Custom Domains",
      description: "Host your forms on your own domain to maintain brand consistency and professional appearance."
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-600" />,
      title: "Access Control",
      description: "Set password protection or restrict access to specific email domains for enhanced security."
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      title: "Team Collaboration",
      description: "Share form management access with team members and control their permissions."
    },
    {
      icon: <Share2 className="h-6 w-6 text-indigo-600" />,
      title: "Social Integration",
      description: "Direct sharing to social media platforms and integration with popular collaboration tools."
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <Share2 className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Instant Form Sharing</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Share your forms instantly with anyone, anywhere. Multiple sharing options 
          ensure your forms reach your audience effectively and securely.
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