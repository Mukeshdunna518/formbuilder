import React from 'react';
import { X } from 'lucide-react';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function SlidePanel({ isOpen, onClose, children, title }: SlidePanelProps) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            className={`w-screen max-w-md transform transition ease-in-out duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={onClose}
                      className="bg-gray-50 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}