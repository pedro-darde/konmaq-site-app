import { baseService } from "../../../services/api";
import { AddedSupplier, Supplier } from "../../../interfaces/Supplier";
import { useEffect, useState } from "react";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<AddedSupplier[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await baseService.get<AddedSupplier[]>("/supplier");
      setSuppliers(data);
    };
  });
  return (
    <div>
      <h1>Lista de fornecedores</h1>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>{supplier.name}</li>
        ))}
      </ul>
    </div>
  );
}
