import BaseComponent from "../components/BaseComponent";
import SignIn from "../components/login/singin";
import { useAuth } from "../hooks/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/router";
export default function Login({ csrfToken, resetHistory }: any) {
  const { signIn } = useAuth();
  const router = useRouter()
  useEffect(() => {
      console.log(resetHistory)
      if (resetHistory) {
          router.replace('/login')
      }
  }, [resetHistory])
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
