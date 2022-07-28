import { NextComponentType } from "next";
import Unauthorized from "./unauthorized";
import { useAuth } from "../hooks/useAuth";
import MustBeLogged from "./MustBeLogged";

function UserAuth<T>(Component: NextComponentType<T>, goTo: string) {
  const Auth = (props: T) => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { getToken } = useAuth();

      if (!getToken()) return <MustBeLogged goTo={goTo} />;
    }

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default UserAuth;
