import Link from "next/link";
import { db } from "../../..";
import { products, suppliers } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";
import InventoryCard from "./inventoryCard";
import ProductForm from "./productForm";
import { revalidatePath } from "next/cache";
async function getProducts() {
  return await db.select().from(products);
}

async function handleDeleteProduct(productid: number) {
  "use server";
  const requ = await db.delete(products).where(eq(products.id, productid));

  revalidatePath("/inventory");
}

async function handleAddProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const price = Number(formData.get("price"));
  const category = formData.get("category")?.toString();

  if (!name || !price || !category) {
    throw new Error("An Error occured during insertion");
  } else {
    const requ = await db.insert(products).values({ name, price, category });
    revalidatePath("/inventory");
  }
}

export default async function Page() {
  const allProducts = await getProducts();

  if (!allProducts) {
    throw new Error("Products could not be fetched");
  }

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <h1 className="text-4xl mt-8 font-serif font-bold mb-8 text-center">
        Available Products
      </h1>
      <div className="mb-20">
          {allProducts.map((elem) => (
            <InventoryCard
              key={elem.id}
              id={elem.id}
              name={elem.name}
              price={elem.price}
              category={elem.category}
              handleDeleteProduct={handleDeleteProduct}
            ></InventoryCard>
          ))}
      </div>
      <ProductForm handleAddProduct={handleAddProduct} />
    </div>
  );
}
