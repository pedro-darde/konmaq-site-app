import { NextComponentType } from "next";
import { KONMAQ_TOKEN_KEY, storage } from "../services/konmaq_storage";
import Unauthorized from "./unauthorized";
import { useAuth } from "../hooks/useAuth";
function AdminAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { getToken } = useAuth();

      if (getToken().role !== "admin") return <Unauthorized />;
    }

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default AdminAuth;
