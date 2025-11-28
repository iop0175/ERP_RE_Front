import React, { useEffect, useState } from "react";
import { getToken } from "@/components/kakao/postKakaoToken";
import { getData } from "@/components/kakao/getKakaoData";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
interface LoginProps {
  setToken: (token: string) => void;
}
const KakaoLogin:React.FC<LoginProps> = ({setToken}) => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("Kakao code:", code);
  const navigate = useNavigate();
  const [localToken, setLocalToken] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (!code) return;

      try {
        const token = await getToken(code);
        const userData = await getData(token);

        const nickname = userData.properties.nickname;
        const email = userData.kakao_account.email;
        const kakaoId = userData.id;
        const profileImage = userData.properties.profile_image;

        try {
          const res = await axios.get("http://localhost:9080/api/kakaoLogin", {
            params: { kakaoId },
          });
          console.log("User found:", res.data);
          const jwt = res.data.token;
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          sessionStorage.setItem("company", JSON.stringify(res.data.company));
          setLocalToken(jwt);
          setToken(jwt);
          sessionStorage.setItem("jwt", jwt);
          sessionStorage.setItem("kakaoLogin", "true");
          navigate('/main')
        } catch (err) {
          const error = err as AxiosError;

          if (error.response) {
            if (error.response.status === 404) {
              const createUser = window.confirm(
                "No Kakao user found. Do you want to create one?"
              );
              if (createUser) {
                console.log("Create user flow here");
                navigate("/signKakao");
                const userInfo = {
                  nickname: userData.properties.nickname,
                  email: userData.kakao_account.email,
                  kakaoId: userData.id,
                  profileImage: userData.properties.profile_image,
                };
                sessionStorage.setItem("kakaoUser", JSON.stringify(userInfo));
              }
            } else {
              console.log(
                `Server returned error ${error.response.status}:`,
                error.response.data
              );
            }
          } else if (error.request) {
            console.log("No response from server", error.request);
          } else {
            console.log("Axios error:", error.message);
          }
        }
      } catch (error) {
        console.error("Kakao API error:", error);
      }
    };

    fetchData();
  }, [code, navigate]);

  return <div></div>;
};

export default KakaoLogin;
