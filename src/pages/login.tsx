import BaseComponent from "../components/BaseComponent";
import SignIn from "../components/login/singin";

export default function Login() {
  const handleLogin = (email: string, password: string) => {
    console.log({ email, password });
  };

  return (
    <BaseComponent title="Login">
      <SignIn handleSubmit={handleLogin} />
    </BaseComponent>
  );
}
