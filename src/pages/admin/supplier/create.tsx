import { Container } from "@mui/material";
import FormSupplierComponent from "../../../components/supplier/FormSupplier";
import TitleComponent from "../../../components/TitleComponent";
import { Supplier } from "../../../interfaces/Supplier";
import { baseService } from "../../../services/api";
import useAlert from "../../../hooks/useAlert";
export default function Create() {
  const { toast } = useAlert();
  const addSupplier = (supplier: Supplier) => {
    console.log(supplier);
    baseService
      .post<{ supplier: Supplier }, { data: any }>("supplier", { supplier })
      .then((res) => {
        toast("Fornecedor criado com sucesso");
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
