import { Container } from "@mui/material";
import useSWR from "swr";
import FormProduct from "../../../components/product/FormProduct";
import TitleComponent from "../../../components/TitleComponent";
import { Category } from "../../../interfaces/Category";
import { AddedSupplier } from "../../../interfaces/Supplier";
import { Product } from "../../../interfaces/Product";
import { baseService } from "../../../services/api";
import useAlert from "../../../hooks/useAlert";

export default function Create() {
  const { toast } = useAlert();
  const { data: categories, error } = useSWR<Category[], any>(
    "category",
    async (url) => {
      const response = await baseService.get<Category[]>(url);
      return response.data;
    }
  );

  const { data: suppliers, error: supplierError } = useSWR<
    AddedSupplier[],
    any
  >("supplier", async (url) => {
    const response = await baseService.get<AddedSupplier[]>(url);
    return response.data;
  });

  const handleSubmit = (product: Product, files: File[]) => {
    const formData = new FormData();
    
    Object.keys(product).forEach(key => {
      /* @ts-ignore */
      if(!product[key]) delete product[key]
    })

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
        toast("Produto criado com sucesso");
      })
      .catch((err) => {
        
        console.log(err);
      });
  };

  return (
    <Container maxWidth="xl">
      <TitleComponent title="Criar Produto" />
      <FormProduct
        categories={categories!}
        handleSubmit={handleSubmit}
        suppliers={suppliers!}
      />
    </Container>
  );
}
