export type Category = {
    [key in CategoryFields]: string | number;
};
export type CategoryFields = "id" | "name" | "category";

export type CategoryPage = {
    id: number,
    name: string,
    active: boolean,
    category: Category | null,
    children: CategoryPage[] | []
}
