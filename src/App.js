import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import SettingsPage from './pages/SettingsPage';
import SettingsSideBar from './pages/SettingsSideBar';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} /> {}
          {}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <SettingsSideBar />
      </div>
    </Router>
  );
}

export default App;
