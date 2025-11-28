import React from 'react';
import { useNavigate } from 'react-router'
interface LogoutProps {
  setToken: (token: string | null) => void;
  token?: string | null;
}
const KakaoLogout:React.FC<LogoutProps> = ({setToken}) =>{
    const navigate = useNavigate()
    sessionStorage.clear();
    setToken(null);
    navigate('/')
    return(
        <>
        </>
    )
}
export default KakaoLogout;