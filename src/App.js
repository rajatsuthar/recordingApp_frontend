import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Recording from './components/MainRecording';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Signup />} />
        <Route path="/recording" element={<Recording />} />
      </Routes>
    </Router>
  );
}

export default App;
