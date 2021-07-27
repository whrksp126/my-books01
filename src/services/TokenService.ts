// api 를 호출해서 redux store 에 token 으로
// 저장하는거 말고
// 브라우저 로컬 스토리지에 저장하는거 까지
// 처리하겠습니다.

const LOCAL_STOREAGE_TOKEN_KEY_NAME = "token";

export default class TokenService {
  // get 이라는 함수는 string 이나 null 을 리턴합니다.
  public static get(): string | null {
    //
    return localStorage.getItem(LOCAL_STOREAGE_TOKEN_KEY_NAME);
  }

  // token 을 string 으로 받아서 return 을 void 로 합니다.
  public static set(token: string): void {
    // localStorage 에 setItem 이라는 함수를 사용해서
    // LOCAL_STOREAGE_TOKEN_KEY_NAME 에 token 을 저정합니다.
    localStorage.setItem(LOCAL_STOREAGE_TOKEN_KEY_NAME, token);
  }

  public static remove(): void {
    localStorage.removeItem(LOCAL_STOREAGE_TOKEN_KEY_NAME);
  }
}

// TokenService.(get,set,remove) 를 redux modules 에서 사용할 수 있도록 처리해야함
