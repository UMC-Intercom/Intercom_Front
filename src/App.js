import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} /> {}
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
