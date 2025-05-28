import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";
import { jwtDecode } from "jwt-decode";

function AppInitializer() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          isLogin: true,
          member_no: decoded.member_no,
          email: decoded.email,
          nickname: decoded.nickname,
          profile_img: decoded.profile_img,
        });
      } catch (err) {
        console.error("토큰 복호화 실패", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return null;
}

export default AppInitializer;