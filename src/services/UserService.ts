// 서비스 로직 만들기

import axios from "axios";

import { LoginReqType, LoginResType } from "../types";

const USER_API_URL = "https://api.marktube.tv/v1/me";
export default class UserService {
  // 로그인 api 를 서비스로 만듬
  public static async login(reqData: LoginReqType): Promise<string> {
    const response = await axios.post(USER_API_URL, reqData);
    return response.data.token;
  }
  // 로그아웃 api 를 서비스로 만듬
  // logout 할 때는 기존에 login 되어 있는 token 값을 보내서
  // USER_API_URL 에 delete 처리를 해줘야 합니다
  public static async logout(token: string): Promise<void> {
    await axios.delete(USER_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
