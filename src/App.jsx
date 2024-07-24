import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    
      <>
        <Home>
          <Routes>
            <Route path="/" element={<Main  />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Home>
      </>
    
  )
}

export default App
