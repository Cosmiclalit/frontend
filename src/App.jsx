import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import LogForm from './components/LogForm.jsx';
import ImageUpload from './components/ImageUpload.jsx';
import VoiceBot from './components/VoiceBot.jsx';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Productivity Tracker</h1>
        <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/log">Add Log</Link>
          <Link to="/images">Images</Link>
          <Link to="/voice">Voice Bot</Link>
        </nav>
        <div className="card">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log" element={<LogForm />} />
            <Route path="/images" element={<ImageUpload />} />
            <Route path="/voice" element={<VoiceBot />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
