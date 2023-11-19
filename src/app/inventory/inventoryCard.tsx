"use client";
import Link from "next/link";

export default function InventoryCard(props: {
  id: number;
  name: string;
  price: number;
  category: string;
  handleDeleteProduct: (productid: number) => void;
}) {
  async function deleteHelper() {
    await props.handleDeleteProduct(props.id);
  }

  if (!props) {
    throw new Error("Something was wrong with props");
  }
  return (
    <div className=" bg-orange-400 w-80 flex flex-col items-center justify-center mb-4 rounded-3xl resize-y">
      <Link href={`/inventory/${props.id}`} className="mt-4">
        <div className="w-60">
          <p>Name: {props.name}</p>
          <p>Price: {String(props.price) + "€"}</p>
          <p>Category: {props.category}</p>
        </div>
      </Link>
      <form action={deleteHelper} name={props.id.toString()} className="mb-4">
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
