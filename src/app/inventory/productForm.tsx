export default function ProductForm(props: {
  handleAddProduct: (formData: FormData) => void;
}) {
  return (
    <form
      className="flex flex-col items-center bg-gray-400 w-80 rounded-3xl text-white resize-y overflow-auto"
      action={props.handleAddProduct}
    >
      <h1>Add New Product:</h1>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        required
        className="bg-gray-400 placeholder:text-white resize-y"
      />
      <div className="flex">
        <p className="mr-4">Price:</p>
        <input
          type="number"
          name="price"
          required
          className="bg-gray-400 placeholder:text-white"
        />
      </div>
      <input
        type="text"
        name="category"
        placeholder="Category"
        required
        className="bg-gray-400 placeholder:text-white resize-y"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
