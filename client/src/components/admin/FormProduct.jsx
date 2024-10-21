import { useState, useEffect } from "react";
import { BookmarkPlus } from "lucide-react";
import { toast } from "react-toastify"; // For success/error notifications
import { useEcomStore } from "../../store/EcomStore";
import { createProduct } from "../../api/product"; // Assuming this is correctly set up
import { useNavigate } from "react-router-dom";

const FormProduct = () => {
  const getCategory = useEcomStore((state) => state.getCategory); // Fetch categories
  const token = useEcomStore((state) => state.token); // Assuming token is stored in the state
  const categories = useEcomStore((state) => state.categories); // Categories from state
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [], // Assuming you might add file upload logic later
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch categories when the component mounts
  useEffect(() => {
    getCategory(token); // Fetching categories
  }, [getCategory, token]); // Adding necessary dependencies

  // Handle change in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data to an API
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createProduct(token, formData); // Ensure `createProduct` handles your form data structure correctly

      // Handle success
      toast.success(`${response.title} added successfully!`);
      setFormData({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: "",
        images: [], // Reset the images field as well
      });
      navigate("/admin/product")
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card shadow-lg bg-accent">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Add New Product</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Flex Container for title and price */}
            <div className="flex gap-4">
              {/* Title */}
              <div className="form-control w-full">
                <label className="label" htmlFor="title">
                  <span className="label-text">Product Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-control w-full">
                <label className="label" htmlFor="price">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter product price"
                  required
                />
              </div>
            </div>

            {/* Flex Container for quantity and category */}
            <div className="flex gap-4">
              {/* Quantity */}
              <div className="form-control w-full">
                <label className="label" htmlFor="quantity">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter available quantity"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-control w-full">
                <label className="label" htmlFor="categoryId">
                  <span className="label-text">Category</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Description (full-width) */}
            <div className="form-control">
              <label className="label" htmlFor="description">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn btn-primary flex items-center gap-2 ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Add Product <BookmarkPlus className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormProduct;
