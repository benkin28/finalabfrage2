"use client";
import { Supplier } from "../../../../drizzle/schema";

export default function SupplierCard(props: {
  supplier: Supplier;
  handleDeleteSupplier: (supplierid: number) => void;
}) {
  async function deleteHelper() {
    await props.handleDeleteSupplier(props.supplier.id);
  }
  return (
    <div className="mb-8 bg-gray-400 w-80 flex flex-col items-center rounded-3xl">
      <p>Supplier Name: {props.supplier.name}</p>
      <p>Supplier Adress:{props.supplier.adress}</p>
      <form action={deleteHelper}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
