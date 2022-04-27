import { Container } from "@mui/material";
import BaseComponent from "../../../components/BaseComponent";
import TitleComponent from "../../../components/TitleComponent";
import FormUserComponentEdit from "../../../components/user/FormUserComponentEdit";
import { UserAdd } from "../../../interfaces/User";
import { baseService } from "../../../services/api";
type UserInfoProps = {
  data: UserAdd;
};
export default function UserInformation({ data }: UserInfoProps) {
  const handleSubmit = (user: UserAdd) => {
    baseService
      .patch<{ user: UserAdd }, any>("user", user.id.toString(), { user })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  return data ? (
    <BaseComponent title="Editar usuário">
      <Container maxWidth="xl">
        <TitleComponent title="Editar usuário" />
        <FormUserComponentEdit userAdd={data} handleSubmit={handleSubmit} />
      </Container>
    </BaseComponent>
  ) : (
    <p> carregando </p>
  );
}
export async function getServerSideProps({ query }: any) {
  const res = await baseService.get<UserAdd>("user/" + query.slug);
  const data = res.data;

  return { props: { data } };
}
