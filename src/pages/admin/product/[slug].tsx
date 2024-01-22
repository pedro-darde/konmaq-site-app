import { Container } from "@mui/material";
import FormProductEdit from "../../../components/product/FormProductEdit";
import TitleComponent from "../../../components/TitleComponent";
import { ProductAdded } from "../../../interfaces/Product";
import { AddedSupplier } from "../../../interfaces/Supplier";
import { baseService } from "../../../services/api";
import { Category } from "../../../interfaces/Category";
import BaseComponent from "../../../components/BaseComponent";
import { useEffect, useState } from "react";
import FetchLoadingComponent from "../../../components/loaders/FetchLoadingComponent";

export default function ProductInformation({ query }: any) {
  const [product, setProduct] = useState<ProductAdded>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<AddedSupplier[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data: dataProduct } = await baseService.get<ProductAdded>(
        "product/" + query.slug
      );
      const dataCategories = await baseService.get<Category[]>("category");
      const dataSuppliers = await baseService.get<AddedSupplier[]>("supplier");
      setProduct(dataProduct);
      setCategories(dataCategories.data);
      setSuppliers(dataSuppliers.data);
    };
    getData();
  }, []);

  const handleSubmit = (productAdded: ProductAdded, file: File[]) => {
    baseService
      .patch<{ product: ProductAdded }, any>(
        "product",
        product!.id.toString(),
        {
          product: productAdded,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  return (
    <BaseComponent title="Editar produto">
      <Container maxWidth={"xl"}>
        <TitleComponent title="Editar Produto" />
        {!product ? (
          <FetchLoadingComponent isLoading={true} />
        ) : (
          <FormProductEdit
            productEdit={product}
            handleSubmit={handleSubmit}
            categories={categories}
            suppliers={suppliers}
          />
        )}
      </Container>
    </BaseComponent>
  );
}

export async function getServerSideProps({ query }: any) {
  return {
    query,
  };
}
