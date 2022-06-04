import { useRouter } from "next/router";
import { createContext, ReactNode, useContext } from "react";
import { baseService } from "../services/api";
import { KONMAQ_TOKEN_KEY, storage } from "../services/konmaq_storage";
import useAlert from "./useAlert";
import jwtDecode from "jwt-decode";

export type UseAuthContextProps = {
  getToken: () =>
    | {
        role: string;
        id: number;
        iat: number;
        exp: number;
        userName: string;
      }
    | string;

  signIn: (password: string, email: string) => void;
  signOut: (user_id: number) => void;
  validateToken: () => Promise<void>;
  updateAccessToken: (id: number) => Promise<void>;
};

export const authContext = createContext({} as UseAuthContextProps);
export const useAuth = () => useContext(authContext);

export type UseAuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: UseAuthContextProviderProps) {
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
  const { fire } = useAlert();

  const signIn = (password: string, email: string) => {
    baseService
      .post<{ password: string; email: string }, { accessToken: string }>(
        "login",
        { email, password }
      )
      .then((res) => {
        storage.set(KONMAQ_TOKEN_KEY, res.data.accessToken);
        router.push("/");
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

  const signOut = (user_id: number) => {};

  return (
    <authContext.Provider
      value={{ getToken, signIn, signOut, validateToken, updateAccessToken }}
    >
      {children}
    </authContext.Provider>
  );
}
