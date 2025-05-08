import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    member_no: null,
    email: "",
    nickname: "",
    profile_img: "",
  },
});