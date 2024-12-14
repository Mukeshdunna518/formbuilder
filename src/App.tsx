import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FormBuilder from './pages/FormBuilder';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Templates from './pages/Templates';
import MyForms from './pages/MyForms';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<FormBuilder />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/my-forms" element={<MyForms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;