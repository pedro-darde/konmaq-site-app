import { Container } from "@mui/material";
import BaseComponent from "./BaseComponent";
import TitleComponent from "./TitleComponent";
import SignIn from "./login/singin";
import { useAuth } from "../hooks/useAuth";

type MustBeLoggedProps = {
  goTo: string;
};

export default function MustBeLogged({ goTo }: MustBeLoggedProps) {
  const { signIn } = useAuth();

  const handleLogin = (email: string, password: string) => {
    signIn(password, email, goTo, false);
  };

  return (
    <BaseComponent title="Faça login">
      <Container maxWidth="sm" sx={{ alignItems: "center" }}>
        <TitleComponent title="Faça login para prosseguir" />
        <SignIn handleSubmit={handleLogin} />
      </Container>
    </BaseComponent>
  );
}
