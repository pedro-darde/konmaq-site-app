import { Container } from "@mui/material";
import FormSupplierEditComponent from "../../../components/supplier/FormSupplierEdit";
import TitleComponent from "../../../components/TitleComponent";
import { AddedSupplier } from "../../../interfaces/Supplier";
import { baseService } from "../../../services/api";

type SupplierInfoProps = {
  data: AddedSupplier;
};
export default function SupplierInformation({
  data: supplier,
}: SupplierInfoProps) {
  const handleSubmit = (supplier: AddedSupplier) => {
    baseService
      .patch<{ supplier: AddedSupplier }, any>(
        "supplier",
        supplier.id.toString(),
        {
          supplier,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };
  return (
    <Container maxWidth="xl">
      <TitleComponent title="Editar fornecedor" />
      <FormSupplierEditComponent
        supplierAdd={supplier}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export async function getServerSideProps({ query }: any) {
  const res = await baseService.get<AddedSupplier>("supplier/" + query.slug);
  const data = res.data;

  return { props: { data } };
}
