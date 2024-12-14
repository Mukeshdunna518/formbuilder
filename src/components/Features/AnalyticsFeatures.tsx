import React from 'react';
import { BarChart, PieChart, LineChart, Table, Download, Bell } from 'lucide-react';

export default function AnalyticsFeatures() {
  const features = [
    {
      icon: <BarChart className="h-6 w-6 text-indigo-600" />,
      title: "Response Analytics",
      description: "View detailed analytics about form submissions, including completion rates, average submission time, and drop-off points."
    },
    {
      icon: <PieChart className="h-6 w-6 text-indigo-600" />,
      title: "Visual Reports",
      description: "Generate beautiful charts and graphs to visualize response data and identify patterns in submissions."
    },
    {
      icon: <LineChart className="h-6 w-6 text-indigo-600" />,
      title: "Real-time Tracking",
      description: "Monitor form performance and submissions in real-time with live updating dashboards."
    },
    {
      icon: <Table className="h-6 w-6 text-indigo-600" />,
      title: "Data Export",
      description: "Export response data in multiple formats (CSV, Excel, PDF) for further analysis or integration with other tools."
    },
    {
      icon: <Download className="h-6 w-6 text-indigo-600" />,
      title: "Custom Reports",
      description: "Create customized reports focusing on the metrics that matter most to your organization."
    },
    {
      icon: <Bell className="h-6 w-6 text-indigo-600" />,
      title: "Smart Notifications",
      description: "Set up alerts for important events like submission milestones or specific response patterns."
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <BarChart className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Analytics</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Gain valuable insights from your form submissions with powerful analytics tools. 
          Track performance, analyze responses, and make data-driven decisions.
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