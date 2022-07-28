import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";
import { baseService } from "../services/api";
import { KONMAQ_TOKEN_KEY, storage } from "../services/konmaq_storage";
import useAlert from "./useAlert";
import jwtDecode from "jwt-decode";
import Login from "../pages/login";

export type UserFromToken = {
  role: string;
  id: number;
  iat: number;
  exp: number;
  userName: string;
};
export type UseAuthContextProps = {
  getToken: () => UserFromToken | string;

  signIn: (
    password: string,
    email: string,
    goTo: string,
    showAlert: boolean
  ) => void;
  signOut: (user_id: number) => void;
  validateToken: () => Promise<void>;
  updateAccessToken: (id: number) => Promise<void>;
  user: UserFromToken;
  loadUserInfo: () => void;
};

export const authContext = createContext({} as UseAuthContextProps);
export const useAuth = () => useContext(authContext);

export type UseAuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: UseAuthContextProviderProps) {
  const [user, setUser] = useState<UserFromToken>({} as UserFromToken);
  const getToken = () => {
    if (typeof window !== "undefined") {
      const token = storage.get<string>(KONMAQ_TOKEN_KEY, false);
      if (token) {
        return jwtDecode<{
          role: string;
          id: number;
          iat: number;
          exp: number;
          userName: string;
        }>(token);
      }
      return "";
    }
    return "";
  };

  const router = useRouter();
  const { fire, toast } = useAlert();

  const signIn = (
    password: string,
    email: string,
    goTo = "/",
    showAlert = false
  ) => {
    baseService
      .post<{ password: string; email: string }, { accessToken: string }>(
        "login",
        { email, password }
      )
      .then((res) => {
        storage.set(KONMAQ_TOKEN_KEY, res.data.accessToken);
        loadUserInfo();
        router.push(goTo);
        if (showAlert) toast("Logado com sucesso.", false, 3500, "bottom-end");
      })
      .catch((err) => {
        const errorMessage = err.response.data.error.name;
        fire(errorMessage);
      });
  };

  async function updateAccessToken(id: number) {
    try {
      const { data } = await baseService.post<
        { id: number },
        { accessToken: string }
      >("update-token", { id });
      storage.set(KONMAQ_TOKEN_KEY, data.accessToken);
    } catch (err) {
      console.log("err on update token");
    }
  }

  async function validateToken() {
    const token = getToken();

    if (token) {
      const { exp, id } = token;
      const expirationDate = new Date(exp * 1000);

      if (new Date().getTime() > expirationDate.getTime()) {
        await updateAccessToken(id);
      }
    }
  }

  const loadUserInfo = () => {
    if (getToken() !== "") {
      const user = getToken() as UserFromToken;
      setUser(user);
    }
  };

  const signOut = (user_id: number) => {};

  return (
    <authContext.Provider
      value={{
        getToken,
        signIn,
        signOut,
        validateToken,
        updateAccessToken,
        user,
        loadUserInfo,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
