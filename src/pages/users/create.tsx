import { Container } from "@mui/material";
import { useRouter } from "next/router";
import TitleComponent from "../../components/TitleComponent";
import FormUserComponent from "../../components/user/FormUserComponent";
import { User, UserAdd } from "../../interfaces/User";
import { baseService } from "../../services/api";
import useAlert from "../../hooks/useAlert";
import Head from "next/head";
import BaseComponent from "../../components/BaseComponent";

export default function Create() {
  const router = useRouter();
  const MyAlert = useAlert();
  const addUser = (user: User) => {
    baseService
      .post<{ user: User }, UserAdd>("user", { user })
      .then((res) => {
        router.push(`/users/${res.data.id}`);
      })
      .catch((err) => {});
  };
  return (
    <BaseComponent title="Adicionar produto">
      <Container maxWidth="xl">
        <TitleComponent title="Criar usuário" />
        <FormUserComponent
          handleSubmit={(user) => {
            addUser(user);
          }}
        />
      </Container>
    </BaseComponent>
  );
}
