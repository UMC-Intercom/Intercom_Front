import React from 'react';
import { AuthProvider } from './pages/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import TalkTalk from './pages/TalkTalk';
import PostPage from './pages/PostPage';
import Posting from './pages/Posting';
import SearchResults from './pages/SearchResults';
import SignUp from './pages/SignUp'; 
import Join from './pages/join';
import SignUp2 from './pages/SignUp2';
import SignUp3 from './pages/SignUp3';
import SignUp4 from './pages/SignUp4'; 
import OnBoarding1 from './pages/OnBoarding1'; 
import OnBoarding2 from './pages/OnBoarding2'; 
import FindingEmail from './pages/FindingEmail'; //추가
import FindedEmail from './pages/FindedEmail'; //추가
import UnfindedEmail from './pages/UnfindedEmail'; //추가
import SettingsPage from './pages/SettingsPage';



function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talktalk" element={<TalkTalk />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path ="/posting" element={<Posting/>} />  
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/join" element={<Join />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} /> 
          <Route path="/signup4" element={<SignUp4 />} />  
          <Route path='/settings' element={<SettingsPage />} />
          <Route path="/onboarding1" element={<OnBoarding1 />} /> 
          <Route path="/onboarding2" element={<OnBoarding2 />} />  
          <Route path="/findingemail" element={<FindingEmail />} /> 
          <Route path="/findedemail" element={<FindedEmail />} />  
          <Route path="/unfindedemail" element={<UnfindedEmail />} /> 
        </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
