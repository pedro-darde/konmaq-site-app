import { Container } from "@mui/material";
import FormSupplierComponent from "../../../components/supplier/FormSupplier";
import TitleComponent from "../../../components/TitleComponent";
import { Supplier } from "../../../interfaces/Supplier";
import { baseService } from "../../../services/api";

export default function Create() {
  const addSupplier = (supplier: Supplier) => {
    baseService
      .post<{ supplier: Supplier }, { data: any }>("supplier", { supplier })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response));
      });
  };
  return (
    <Container maxWidth="xl">
      <TitleComponent title="Criar fornecedor" />
      <FormSupplierComponent
        handleSubmit={(user) => {
          addSupplier(user);
        }}
      />
    </Container>
  );
}
