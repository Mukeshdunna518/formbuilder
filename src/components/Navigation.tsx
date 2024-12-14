import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Home, FileText, DollarSign, MessageCircle } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Layout className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FormCraft</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link to="/features" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <FileText className="h-4 w-4 mr-2" />
                Features
              </Link>
              <Link to="/pricing" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/builder" className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
              Start Building
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}