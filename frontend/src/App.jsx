import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoadmapView from './pages/RoadmapView';
import AdminRoadmapView from './pages/admin/AdminRoadmapView';

function App() {
  const [role, setRole] = useState('user'); // or 'admin'
  return (
    <Router>
      <div>
        <h1>Jira Roadmap Visualization</h1>
        <Routes>
          <Route path='/' element={<RoadmapView />} />
          <Route path='/admin' element={role === 'admin' ? <AdminRoadmapView /> : <Navigate to='/' />} />
        </Routes>
        <button onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}>
          Switch to {role === 'admin' ? 'User' : 'Admin'} View
        </button>
      </div>
    </Router>
  );
}

export default App;
