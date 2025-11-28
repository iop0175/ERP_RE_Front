import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import "@/styles/css/pages/login.css"
interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const navigate = useNavigate()
  const REST_API = process.env.REACT_APP_REST_API;
  const REDIRECT_URI = "http://localhost:3001/kakao";
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [localToken, setLocalToken] = useState('');
  const [block, setBlock] = useState(false);
  const sign = async () => {
    try {
      await axios.post("http://localhost:9080/api/signup", { userName: name, email, password, companyId: company });
      alert("회원가입 성공! 로그인 해주세요.");
      setBlock(prev => !prev);
    } catch (err: any) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:9080/api/login", { email, password });
      const jwt = res.data.token;
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("company", JSON.stringify(res.data.company));
      setToken(jwt);
      setLocalToken(jwt);
      sessionStorage.setItem("jwt", jwt);
      navigate('/main')
    } catch (err: any) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  return (
    <div className="login_content">
      <div>
        <div className="login_block" style={!block ? { transform: 'translateX(100%)' } : { transform: 'translateX(0%)' }}></div>
        <div className="login_box">
          <h2 className="login_title">LOGIN</h2>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <div></div>
          <button onClick={login}>Log In</button>
          <a className="kakaoBtn" href={`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`}></a>
          <button onClick={() => { setBlock(prev => !prev) }}>new User</button>
        </div>
        <div className="login_box">
          <h2 className="sign_Title">NEW USER</h2>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="company" onChange={(e) => setCompany(e.target.value)} />
          <button onClick={sign}>Sign Up</button>
          <button onClick={() => { setBlock(prev => !prev) }}>back</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
