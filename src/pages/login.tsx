import BaseComponent from "../components/BaseComponent";
import SignIn from "../components/login/singin";
import { useAuth } from "../hooks/useAuth";
export default function Login({ csrfToken }: any) {
  const { signIn } = useAuth();

  return (
    <BaseComponent title="Login">
      <SignIn
        handleSubmit={(email, password) => {
          signIn(password, email);
        }}
      />
    </BaseComponent>
  );
}
