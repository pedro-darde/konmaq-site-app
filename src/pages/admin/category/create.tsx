import { Container } from "@mui/material";
import useSWR from "swr";
import AdminAuth from "../../../components/adminAuth";
import BaseComponent from "../../../components/BaseComponent";
import FormCategory from "../../../components/category/admin/FormCategory";
import TitleComponent from "../../../components/TitleComponent";
import { Category } from "../../../interfaces/Category";
import { baseService } from "../../../services/api";

const Create = () => {
  const addCategory = (category: Partial<Category>) => {
    delete category["id"];
    if (category.category === "") delete category["category"];
    baseService
      .post<{ category: Partial<Category> }, { data: any }>("category", {
        category,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data: categories, error } = useSWR<Category[], any>(
    "category",
    async (url) => {
      const response = await baseService.get<Category[]>(url);
      return response.data;
    }
  );

  return (
    <BaseComponent title="Criar categoria">
      <Container maxWidth="xl">
        <TitleComponent title="Criar categoria" />
        <FormCategory handleSubmit={addCategory} categories={categories} />
      </Container>
    </BaseComponent>
  );
};

export default AdminAuth(Create)
