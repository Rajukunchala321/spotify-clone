import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage/Index'

function App() {
  return (
    <Routes>
      <Route path='/login' element = { <LoginPage /> } />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
