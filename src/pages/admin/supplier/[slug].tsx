import { Container } from "@mui/material";
import BaseComponent from "../../../components/BaseComponent";
import FormSupplierEditComponent from "../../../components/supplier/FormSupplierEdit";
import TitleComponent from "../../../components/TitleComponent";
import { AddedSupplier } from "../../../interfaces/Supplier";
import { baseService } from "../../../services/api";
import { useEffect, useState } from "react";
import FetchLoadingComponent from "../../../components/loaders/FetchLoadingComponent";

type SupplierInfoProps = {
  data: AddedSupplier;
};
export default function SupplierInformation(query: any) {
  const [supplier, setSupplier] = useState<AddedSupplier>();

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

  useEffect(() => {
    const getData = async () => {
      const res = await baseService.get<AddedSupplier>(
        "supplier/" + query.slug
      );
      setSupplier(res.data);
    };
    getData();
  }, []);
  return (
    <BaseComponent title="Editar fornecedor">
      <Container maxWidth="xl">
        <TitleComponent title="Editar fornecedor" />
        {!supplier ? (
          <FetchLoadingComponent isLoading={true} />
        ) : (
          <FormSupplierEditComponent
            supplierAdd={supplier}
            handleSubmit={handleSubmit}
          />
        )}
      </Container>
    </BaseComponent>
  );
}
