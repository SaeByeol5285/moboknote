import { atom } from "recoil";

export const defaultUserState = {
  isLogin: false,
  member_no: null,
  email: "",
  nickname: "",
  profile_img: "",
  intro: "",
}

export const userState = atom({
  key: "userState",
  default: defaultUserState,
});