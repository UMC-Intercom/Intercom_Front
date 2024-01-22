import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import Join from './pages/join';
import SignUp from './pages/SignUp';
import SearchResults from './pages/SearchResults'; // SearchResults 컴포넌트 추가


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} /> {/* 검색 결과 페이지 라우트 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;