import { Container } from "@mui/material";
import useSWR from "swr";
import FormProduct from "../../../components/product/FormProduct";
import TitleComponent from "../../../components/TitleComponent";
import { Category } from "../../../interfaces/Category";
import { AddedSupplier } from "../../../interfaces/Supplier";
import { Product } from "../../../interfaces/Product";
import { baseService } from "../../../services/api";
import useAlert from "../../../hooks/useAlert";
import { useState } from "react";
import FetchLoadingComponent from "../../../components/loaders/FetchLoadingComponent";
import BaseComponent from "../../../components/BaseComponent";
import { useWithAuthAdmin } from "../../../hooks/withAuth";
import Login from "../../login";
import Unauthorized from "../../../components/unauthorized";

export default function Create() {
  const { toast } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const { whereGoTo } = useWithAuthAdmin();
  const where = whereGoTo();
  if (where !== "continue") {
    if (where === "login") {
      return <Login />;
    }
    if (where === "unauthorized") {
      return <Unauthorized />;
    }
  }
  const { data: categories, error } = useSWR<Category[], any>(
    "category",
    async (url) => {
      setLoading(true);
      const response = await baseService.get<Category[]>(url);
      setLoading(false);
      return response.data;
    }
  );

  const { data: suppliers, error: supplierError } = useSWR<
    AddedSupplier[],
    any
  >("supplier", async (url) => {
    setLoading(true);
    const response = await baseService.get<AddedSupplier[]>(url);
    setLoading(false);
    return response.data;
  });

  const handleSubmit = (product: Product, files: File[]) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      /* @ts-ignore */
      if (!product[key]) delete product[key];
    });

    formData.append("product", JSON.stringify(product));
    files.forEach((file) => {
      formData.append("images", file);
    });
    baseService
      .post<FormData, { data: any }>("product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast("Produto criado com sucesso");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <BaseComponent title="Adicionar produto" shouldValidatePermission={true}>
      <Container maxWidth="xl">
        <TitleComponent title="Criar Produto" />
        <FormProduct
          categories={categories!}
          handleSubmit={handleSubmit}
          suppliers={suppliers!}
        />
        <FetchLoadingComponent isLoading={loading} />
      </Container>
    </BaseComponent>
  );
}
