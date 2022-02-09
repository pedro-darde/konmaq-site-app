import { Container } from "@mui/material";
import TitleComponent from "../../components/TitleComponent";
import FormUserComponent from "../../components/user/FormUserComponent";
import { User } from "../../interfaces/User";
import { baseService } from "../../services/api";

export default function Create() {
  const addUser = (user: User) => {
    baseService
      .post<{ user: User }, { data: any }>("user", { user })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response));
      });
  };
  return (
    <Container maxWidth="xl">
      <TitleComponent title="Criar usuário" />
      <FormUserComponent
        handleSubmit={(user) => {
          addUser(user);
        }}
      />
    </Container>
  );
}
