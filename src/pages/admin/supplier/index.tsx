import { GetServerSideProps } from "next";
import { baseService } from "../../../services/api";
import { AddedSupplier, Supplier } from "../../../interfaces/Supplier";

export default function SupplierList({suppliers}: any) {
    return (
        <div>
            <h1>Lista de fornecedores</h1>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier.id}>{supplier.name}</li>
                ))}
            </ul>
        </div>
    )
}

export  const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const { data } = await baseService.get<AddedSupplier[]>("/supplier");
        console.log(data)
        return {
            props: {
                suppliers: data
            }
        }     
    } catch (e: any) {
        console.log(e.response.data)
        return {
            props: {
                suppliers: []
            }
        }
    }
    
}