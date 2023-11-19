import ProductCard from "./productCard";
import { db } from "../../../..";
import { products, suppliers } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import NotFound from "@/app/not-found";
async function getProduct(id: number) {
  return await db.select().from(products).where(eq(products.id, id));
}

export default async function Page({ params }: { params: { id: number } }) {
  async function handleAddSupplier(formData: FormData) {
    "use server";

    const name = formData.get("supplier")?.toString();
    const adress = formData.get("adress")?.toString();

    if (!name || !adress) {
      throw new Error("Error while adding supplier");
    }

    const requ = await db
      .insert(suppliers)
      .values({ name, adress, product: params.id });

    revalidatePath(`/inventory/${params.id}`);
  }

  async function handleDeleteSupplier(supplierid: number) {
    "use server";
    const requ = await db.delete(suppliers).where(eq(suppliers.id, supplierid));

    revalidatePath(`/inventory/${params.id}`);
  }

  async function handleEdit(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const price = Number(formData.get("price"));
    const category = formData.get("category")?.toString();

    if (!name || !price || !category) {
      throw new Error("An Error occured during updating");
    } else {
      const requ = await db
        .update(products)
        .set({ name, price, category })
        .where(eq(products.id, params.id));
      revalidatePath(`/inventory/${params.id}`);
    }
  }

  async function getSuppliers() {
    return await db
      .select({
        id: suppliers.id,
        name: suppliers.name,
        adress: suppliers.adress,
        product: suppliers.product,
      })
      .from(products)
      .innerJoin(
        suppliers,
        and(eq(suppliers.product, products.id), eq(products.id, params.id))
      );
  }

  const fetchToDo = await getProduct(params.id);
  const fetchSuppliers = await getSuppliers();
  if (!fetchToDo) {
    throw new Error("Error while fetching the product");
    return <div />;
  } else {
    const toDo = await fetchToDo[0];
    if (await !toDo) {
      return NotFound();
    }
    return (
      <div className="bg-white w-screen h-screen flex flex-col items-center justify-center">
        <ProductCard
          id={toDo.id}
          name={toDo.name}
          price={toDo.price}
          category={toDo.category}
          handleAddSupplier={handleAddSupplier}
          currentSuppliers={fetchSuppliers}
          handleDeleteSupplier={handleDeleteSupplier}
          handleEdit={handleEdit}
        />
      </div>
    );
  }
}
