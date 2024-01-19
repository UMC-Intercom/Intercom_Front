import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import SignUp from './pages/SignUp';
import Join from './pages/join';
import SignUp2 from './pages/SignUp2';
import SignUp3 from './pages/SignUp3';
import SignUp4 from './pages/SignUp4';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} /> {}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/join" element={<Join />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} />
          <Route path="/signup4" element={<SignUp4 />} />
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
