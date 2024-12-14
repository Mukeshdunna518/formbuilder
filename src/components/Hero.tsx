import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Share2, BarChart } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Create powerful forms</span>
                <span className="block text-indigo-600">in minutes, not hours</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Build beautiful, responsive forms with our intuitive drag-and-drop builder. Share them instantly and manage submissions effortlessly.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/builder" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Start Building
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/templates" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    View Templates
                  </Link>
                </div>
              </div>
            </div>
          </main>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 px-4 sm:px-6 lg:px-8">
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-indigo-600" />}
              title="Drag-and-Drop Builder"
              description="Create forms easily with our intuitive drag-and-drop interface. No coding required."
            />
            <FeatureCard
              icon={<Share2 className="h-8 w-8 text-indigo-600" />}
              title="Instant Sharing"
              description="Share your forms with a unique link or embed them directly on your website."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8 text-indigo-600" />}
              title="Advanced Analytics"
              description="Track submissions and analyze responses with powerful built-in analytics."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
}