import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecomerce-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: 31,
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);
  const getProduct = useEcomStore((state) => state.getProduct);
  useEffect(() => {
    getCategory();
  }, [getCategory, token]);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success("Created " + res.data.title + " successfully");
      setForm(initialState)
      getProduct()
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="p-6 bg-secondary rounded-lg shadow-md w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={form.title}
            name="title"
            onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Product Title"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            value={form.description}
            name="description"
            onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Product Description"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            value={form.price}
            name="price"
            onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Product Price"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            value={form.quantity}
            name="quantity"
            onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Product Quantity"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleOnChange}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Product Image</span>
          </label>
          <UploadFile form={form} setForm={setForm}/>
        </div>
        
        <button type="submit" className="btn btn-success w-full mt-4">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default FormProduct;
