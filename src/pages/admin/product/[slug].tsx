import { Container } from "@mui/material";
import FormProductEdit from "../../../components/product/FormProductEdit";
import TitleComponent from "../../../components/TitleComponent";
import { ProductAdded } from "../../../interfaces/Product";
import { AddedSupplier } from "../../../interfaces/Supplier";
import { baseService } from "../../../services/api";
import { Category } from "../../../interfaces/Category";
import BaseComponent from "../../../components/BaseComponent";
type ProductInfoProps = {
  product: ProductAdded;
  categories: Category[];
  suppliers: AddedSupplier[];
};
export default function ProductInformation({
  categories,
  product,
  suppliers,
}: ProductInfoProps) {
  const handleSubmit = (productAdded: ProductAdded, file: File[]) => {
    baseService
      .patch<{ product: ProductAdded }, any>("product", product.id.toString(), {
        product: productAdded,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  return (
    <BaseComponent title="Editar produto">
      <Container maxWidth={"xl"}>
        <TitleComponent title="Editar Produto" />
        <FormProductEdit
          productEdit={product}
          handleSubmit={handleSubmit}
          categories={categories}
          suppliers={suppliers}
        />
      </Container>
    </BaseComponent>
  );
}

export async function getServerSideProps({ query }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dataProduct = await baseService.get<ProductAdded>(
    "product/" + query.slug
  );
  const dataCategories = await baseService.get<Category[]>("category");
  const dataSuppliers = await baseService.get<AddedSupplier[]>("supplier");

  return {
    props: {
      product: dataProduct.data,
      categories: dataCategories.data,
      suppliers: dataSuppliers.data,
    },
  };
}
