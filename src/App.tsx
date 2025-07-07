// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuoteGenerator from './pages/QuoteGenerator';
import InvoiceGenerator from './components/InvoiceGenerator';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuoteGenerator />} />
        <Route path="/invoice" element={<InvoiceGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
