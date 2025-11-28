import React, { useState } from 'react';
import Header from './components/ui/Header';
import Login from './Pages/Login';
import Main from './Pages/Main';
import './styles/css/main.css';
import Sidebar from './components/ui/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router'
import KakaoLogin from './components/kakao/KakaoLogin';
import KakaoSignUp from './Pages/KakaoSignUp';
import KakaoLogout from './components/kakao/KakaoLogout';
import ProjectPage from './Pages/project/ProjectPage';
import Mail from './Pages/mail/Mail';
function App() {
  const [token, setToken] = useState(sessionStorage.getItem("jwt"));
  const isLoggedIn = token && token !== "";

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn && <Header setToken={setToken} token={token} />}
        <div className='content'>
          {isLoggedIn && <Sidebar/>}
          <Routes>
            <Route path='/' element={<Login setToken={setToken} />} />
            <Route path='/kakao' element={<KakaoLogin setToken={setToken}/>} />
            <Route path="/kakaoLogout" element={<KakaoLogout setToken={setToken}/>}/>
            <Route path='/signKakao' element={<KakaoSignUp/>}/>
            <Route path='/main/*' element={<Main/>} />
            <Route path='/project/*' element={<ProjectPage/>}/>
            <Route path='/mail/*' element={<Mail/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
