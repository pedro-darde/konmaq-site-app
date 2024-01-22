import { createContext, useContext } from "react";
import { UserFromToken, useAuth } from "./useAuth";
import Login from "../pages/login";
import Unauthorized from "../components/unauthorized";

type WhereGoToPossibilities = "login" | "unauthorized" | "continue"
interface WithAuthAdminContextProps {
  whereGoTo(): WhereGoToPossibilities;
}

export const WithAuthAdminContext = createContext(
  {} as WithAuthAdminContextProps
);
export const useWithAuthAdmin = () => useContext(WithAuthAdminContext);

type WithAuthContextProviderProps = {
  children: React.ReactChild;
};

export function WithAuthAdminContextProvider({
  children,
}: WithAuthContextProviderProps) {
  const whereGoTo = () => {
    const { getToken } = useAuth();
    if (getToken() === "") {
      return "login";
    }
    if (
      typeof getToken() !== "string" &&
      (getToken() as UserFromToken).role !== "admin"
    ) {
      return "unauthorized";
    }
    return "continue";
  };
  return (
    <WithAuthAdminContext.Provider
      value={{
        whereGoTo,
      }}
    >
      {children}
    </WithAuthAdminContext.Provider>
  );
}
