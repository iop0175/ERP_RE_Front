import { useEffect, useState } from "react";
import '@/styles/css/ui/header.css'
import { useNavigate } from 'react-router'
import axios from "axios";
interface HeaderProps {
  setToken: (token: string | null) => void;
  token?: string | null;

}

interface Company {
  companyId: number;
  companyName: string;
}

interface User {
  userId: number;
  userName: string;
  email: string;
  deptId: number | null;
}

const Header: React.FC<HeaderProps> = ({ setToken, token }) => {
  const navigate = useNavigate()
  const kakao = sessionStorage.getItem("kakaoLogin");
  const [company, setCompany] = useState<Company | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const REST_API = process.env.REACT_APP_REST_API;
  const REDIRECT_URI = "http://localhost:3001/kakaoLogout";
  const logout = async () => {
    setToken(null);
    setCompany(null);
    setUser(null);
    sessionStorage.clear();
    navigate('/')
  }
  useEffect(() => {
    const savedCompany = sessionStorage.getItem("company");
    if (savedCompany) setCompany(JSON.parse(savedCompany));

    const savedUser = sessionStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [token]);

  return (
    <div>
      <header>

        <div className="hader_title">{company?.companyName ?? "회사 없음"}</div>

        <div className="header_nav">
          <button onClick={() => { navigate('main') }}>DashBoard</button>
          <button onClick={() => { navigate('all') }}>AllPage</button>
          <button onClick={() => { navigate('my') }}>MyPage</button>
        </div>

        <div className="header_userBox">
          <h2>{user?.userName ?? "사용자 없음"}</h2>
          {kakao ? <button onClick={logout}>Logout</button> :
            <a href={`https://kauth.kakao.com/oauth/logout?client_id=${REST_API}&logout_redirect_uri=${REDIRECT_URI}`} className="kakaoLogout">Logout</a>}
        </div>
      </header>
    </div>
  )
}

export default Header;
