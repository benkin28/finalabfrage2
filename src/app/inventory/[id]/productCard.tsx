"use client";
import { Supplier } from "../../../../drizzle/schema";
import SupplierCard from "./supplierCard";
import { useState } from "react";
import ProductForm from "../productForm";
export default function ProductCard(props: {
  id: number;
  name: string;
  price: number;
  category: string;
  handleAddSupplier: (formData: FormData) => void;
  currentSuppliers: Supplier[];
  handleDeleteSupplier: (supplierid: number) => void;
  handleEdit: (formData: FormData) => void;
}) {
  const [onEdit, setOnEdit] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: props.name,
    price: props.price,
    category: props.category,
  });
  return (
    <div className="flex flex-col items-center">
      {onEdit ? (
        <form
          action={props.handleEdit}
          onSubmit={() => setOnEdit(false)}
          className="mb-8 bg-gray-400 w-80 overflow-auto rounded-2xl flex flex-col items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="bg-gray-400 "
            required
          />
          <div className="flex">
            <p className="mr-2">Price:</p>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
              required
              className="bg-gray-400 "
            />
          </div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
            className="bg-gray-400 "
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="mb-8 bg-gray-400 w-80 flex flex-col items-center rounded-3xl">
          <p>Product name: {props.name}</p>
          <p>Price: {String(props.price) + "€"}</p>
          <p>Category: {props.category}</p>
          <button onClick={() => setOnEdit(!onEdit)}>Edit</button>
        </div>
      )}
      <div className="mb-8 w-80 flex flex-col items-center rounded-3xl">
        <h2 className=" text-xl mb-4">Current suppliers:</h2>
        {props.currentSuppliers.map((elem) => (
          <SupplierCard
            key={elem.id}
            supplier={elem}
            handleDeleteSupplier={props.handleDeleteSupplier}
          ></SupplierCard>
        ))}
      </div>
      <form
        action={props.handleAddSupplier}
        className="flex flex-col items-center resize-y"
      >
        <h2>Add new Supplier</h2>
        <div className="mb-8 bg-gray-400 w-80 flex flex-col items-center rounded-3xl">
          <input
            type="text"
            placeholder="Suppliername"
            name="supplier"
            className="bg-gray-400 mt-2 placeholder:text-white"
          />
          <input
            type="text"
            placeholder="Adress"
            name="adress"
            className="bg-gray-400 placeholder:text-white"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
