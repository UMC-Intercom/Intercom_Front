import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} /> {}
          <Route path="/join" element={<SignUp />} />
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
