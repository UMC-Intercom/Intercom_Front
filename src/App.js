import React from 'react';
import { AuthProvider } from './pages/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import TalkTalk from './pages/TalkTalk';
import PostPage from './pages/PostPage';
import Posting from './pages/Posting';
import SearchResults from './pages/SearchResults';
import SignUp from './pages/SignUp'; //추가
import Join from './pages/join'; //추가
import SignUp2 from './pages/SignUp2'; //추가
import SignUp3 from './pages/SignUp3'; //추가
import SignUp4 from './pages/SignUp4'; //추가
import OnBoarding1 from './pages/OnBoarding1'; //추가
import OnBoarding2 from './pages/OnBoarding2'; //추가 
import SettingsPage from './pages/SettingsPage';



function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/talktalk" element={<TalkTalk />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path ="/posting" element={<Posting/>} />  
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/join" element={<Join />} /> 
          <Route path="/signup2" element={<SignUp2 />} /> 
          <Route path="/signup3" element={<SignUp3 />} />  
          <Route path="/signup4" element={<SignUp4 />} />
          <Route path="/setting" element={<SettingsPage />} /> 
          <Route path="/onboarding1" element={<OnBoarding1 />} />  
          <Route path="/onboarding2" element={<OnBoarding2 />} />
        </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;