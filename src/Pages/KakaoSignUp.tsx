import axios from "axios";
import { sign } from "crypto";
import { aS } from "node_modules/@fullcalendar/core/internal-common";
import { useEffect, useState } from "react";
interface KakaoUser {
    nickname: string;
    email: string;
    kakaoId: string;
    profileImage: string;
}
const KakaoSignUp = () => {
    const [kakaoUser, setKakaoUser] = useState<KakaoUser | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    // sessionStorage에서 Kakao user 불러오기
    useEffect(() => {
        const storedUser = sessionStorage.getItem("kakaoUser");
        if (storedUser) {
            const parsedUser: KakaoUser = JSON.parse(storedUser);
            setKakaoUser(parsedUser);
            setEmail(parsedUser.email)
        }
    }, []);

    if (!kakaoUser) return;
    const payload = {
        kakaoId: kakaoUser.kakaoId,
        nickname: kakaoUser.nickname,
        profileImage: kakaoUser.profileImage,
        userName: name,
        email: email,
        password: password,
        companyId: company
    };
    const sign = async () => {
        if (!payload) return;
        try {
            await axios.post("http://localhost:9080/api/kakaoLogin", { payload });
            alert("회원가입 성공! 로그인 해주세요.");
        } catch (err: any) {
            console.error(err);
            alert("회원가입 실패");
        }
    };
    return (
        <div>
            <h2 className="sign_Title">KAKAO SIGNUP</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder={kakaoUser.email} readOnly />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="company" onChange={(e) => setCompany(e.target.value)} />
            <button onClick={sign}>Sign Up</button>
        </div>
    )
}
export default KakaoSignUp;