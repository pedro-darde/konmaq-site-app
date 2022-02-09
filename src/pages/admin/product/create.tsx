import { Container } from "@mui/material";
import useSWR from "swr";
import FormProduct from "../../../components/product/FormProduct";
import TitleComponent from "../../../components/TitleComponent";
import { Category } from "../../../interfaces/Category";
import { Product } from "../../../interfaces/Product";
import { baseService } from "../../../services/api";

export default function Create() {
  const { data: categories, error } = useSWR<Category[], any>(
    "category",
    async (url) => {
      const response = await baseService.get<Category[]>(url);
      return response.data;
    }
  );

  const handleSubmit = (product: Product) => {
    console.log(product);
  };

  return (
    <Container maxWidth="xl">
      <TitleComponent title="Criar Produto" />
      <FormProduct categories={categories!} handleSubmit={handleSubmit} />
    </Container>
  );
}
