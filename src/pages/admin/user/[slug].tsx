import { Container } from "@mui/material";
import BaseComponent from "../../../components/BaseComponent";
import TitleComponent from "../../../components/TitleComponent";
import FormUserComponentEdit from "../../../components/user/FormUserComponentEdit";
import { User, UserAdd } from "../../../interfaces/User";
import { baseService } from "../../../services/api";
import { useEffect, useState } from "react";
import FetchLoadingComponent from "../../../components/loaders/FetchLoadingComponent";
type UserInfoProps = {
  data: UserAdd;
};
export default function UserInformation(query: any) {
  const [user, setUser] = useState<UserAdd>();
  const handleSubmit = (user: UserAdd) => {
    baseService
      .patch<{ user: UserAdd }, any>("user", user.id.toString(), { user })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const getData = async () => {
      const res = await baseService.get<UserAdd>("user/" + query.slug);
      const data = res.data;
      setUser(data);
    };
    getData();
  }, []);

  return user ? (
    <BaseComponent title="Editar usuário">
      <Container maxWidth="xl">
        <TitleComponent title="Editar usuário" />
        <FormUserComponentEdit userAdd={user} handleSubmit={handleSubmit} />
      </Container>
    </BaseComponent>
  ) : (
    <FetchLoadingComponent isLoading />
  );
}
