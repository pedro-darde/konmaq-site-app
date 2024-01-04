import { NextComponentType } from "next";
import Unauthorized from "./unauthorized";
import {useAuth, UserFromToken} from "../hooks/useAuth";
import Login from "../pages/login";
import {useRouter} from "next/router";
function AdminAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const router = useRouter()
      // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getToken } = useAuth();

    if (getToken() === "") {
      return <Login {...props}  resetHistory={true} />
    }
    if (typeof getToken() !== "string" && (getToken() as UserFromToken).role !== "admin") return <Unauthorized />;

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default AdminAuth;
