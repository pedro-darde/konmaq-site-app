import { Container } from "@mui/material";
import { useRouter } from "next/router";
import TitleComponent from "../../components/TitleComponent";
import FormUserComponent from "../../components/user/FormUserComponent";
import { User, UserAdd, UserAddress } from "../../interfaces/User";
import { baseService } from "../../services/api";
import BaseComponent from "../../components/BaseComponent";
const Create = () => {
  const router = useRouter();
  const addUser = (user: User, userAddress: UserAddress) => {
    Object.keys(user).forEach((key) => {
      if (!user[key]) delete user[key];
    });

    baseService
      .post<{ user: User; userAddress: UserAddress }, UserAdd>("user", {
        user,
        userAddress,
      })
      .then((res) => {
        router.push(`/login`);
      })
      .catch((err) => {});
  };
  return (
    <BaseComponent title="Adicionar produto">
      <Container maxWidth="xl">
        <TitleComponent title="Criar usuário" />
        <FormUserComponent
          handleSubmit={(user, userAddress) => {
            addUser(user, userAddress);
          }}
        />
      </Container>
    </BaseComponent>
  );
};

export default Create;
