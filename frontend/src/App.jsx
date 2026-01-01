import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';

function App() {
  return (
    <Router>
      <div className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">FingerPay</Link>
          <div className="space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
            <Link to="/pos" className="text-gray-600 hover:text-indigo-600 font-medium">POS Terminal</Link>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<POS />} />
      </Routes>
    </Router>
  );
}

export default App;
