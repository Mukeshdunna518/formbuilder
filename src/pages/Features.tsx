import React from 'react';
import Navigation from '../components/Navigation';
import { Layout, Share2, BarChart } from 'lucide-react';
import SharingFeatures from '../components/Features/SharingFeatures';
import BuilderFeatures from '../components/Features/BuilderFeatures';
import AnalyticsFeatures from '../components/Features/AnalyticsFeatures';

export default function Features() {
  const [activeTab, setActiveTab] = React.useState('builder');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-lg text-gray-600">Discover powerful tools to create and manage your forms</p>
        </div>

        <div className="flex justify-center mb-8">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'builder'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Layout className="inline-block h-5 w-5 mr-2" />
              Drag-and-Drop Builder
            </button>
            <button
              onClick={() => setActiveTab('sharing')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'sharing'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Share2 className="inline-block h-5 w-5 mr-2" />
              Instant Sharing
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'analytics'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart className="inline-block h-5 w-5 mr-2" />
              Advanced Analytics
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'builder' && <BuilderFeatures />}
          {activeTab === 'sharing' && <SharingFeatures />}
          {activeTab === 'analytics' && <AnalyticsFeatures />}
        </div>
      </div>
    </div>
  );
}