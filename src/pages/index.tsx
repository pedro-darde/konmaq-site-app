"use-client";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import OpenPageComponent from "../components/OpenPageComponent";
import { ProductWithFiles } from "../interfaces/Product";
import { baseService } from "../services/api";
import { Category, CategoryPage } from "../interfaces/Category";
import BaseComponent from "../components/BaseComponent";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import FetchLoadingComponent from "../components/loaders/FetchLoadingComponent";

export default function Home() {
  const { validateToken } = useAuth();
  const [product, setProducts] = useState<{
    releases: ProductWithFiles[];
    popular: ProductWithFiles[];
  }>();
  const [pageCategories, setPageCategories] = useState<CategoryPage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const validate = async () => {
      await validateToken();
    };
    const getData = async () => {
      const promiseProductHome = baseService.get<{
        releases: ProductWithFiles[];
        popular: ProductWithFiles[];
      }>("product-homepage");
      const promisePageCategories =
        baseService.get<CategoryPage[]>("pages/category");

      const promiseCategories = baseService.get<Category[]>("category");

      const [
        { data: product },
        { data: pageCategories },
        { data: categories },
      ] = await Promise.all([
        promiseProductHome,
        promisePageCategories,
        promiseCategories,
      ]);
      setProducts(product);
      setPageCategories(pageCategories);
      setCategories(categories);
    };
    getData();
    validate();
  }, []);
  if (!product) return <FetchLoadingComponent isLoading={!product} />;

  return (
    <BaseComponent title="Konmaq">
      <div className={styles.container}>
        <main className={styles.main}>
          <OpenPageComponent
            product={product!}
            pageCategories={pageCategories}
            categories={categories}
          />
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/pedro-darde"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{"@pedro_darde"}
            <span className={styles.logo}>
              <Image
                src="/konmaqlogo.jpg"
                alt="Konmaq Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </BaseComponent>
  );
}
