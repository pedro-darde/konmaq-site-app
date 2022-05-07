import BaseComponent from "../components/BaseComponent";
import SignIn from "../components/login/singin";
import { getCsrfToken, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAlert from "../hooks/useAlert";
export default function Login({ csrfToken }: any) {
  const router = useRouter();
  const alert = useAlert();

  const handleLogin = async (email: string, password: string) => {
    await signIn("credentials", {
      username: email,
      password,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (router.query.error) {
      alert.fire(router.query.error);
    }
  }, [router]);

  return (
    <BaseComponent title="Login">
      <SignIn handleSubmit={handleLogin} csrfToken={csrfToken} />
    </BaseComponent>
  );
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
