import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEcomStore } from "../../store/EcomStore";
import { useEffect, useState } from "react";

const ProductList = () => {
  const getProduct = useEcomStore((state) => state.getProduct); // Get the action from the store
  const products = useEcomStore((state) => state.products); // Get products from the store
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [quantity, setQuantity] = useState(30); // Default quantity

  // Fetch products when the component mounts or quantity changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        await getProduct(quantity); // Use the action to get products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [getProduct, quantity]); // Dependency array to rerun effect if quantity changes

  // Render loading or error message
  if (loading) {
    return (
      <>
        <span className="loading loading-bars loading-md"></span>
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between mx-4 my-4">
        <h1 className="text-2xl font-bold capitalize">Products</h1>

        <Link to={"/admin/add-product/"}>
          <button className="btn btn-accent capitalize flex items-center gap-2">
            Add product <PackagePlus className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Input field for quantity */}
      <div className="flex items-center mx-4 my-2">
        <label htmlFor="quantity" className="mr-2">
          Number of Products:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))} // Convert input to number
          className="input input-bordered w-24"
        />
        <button
          onClick={() => getProduct(quantity)}
          className="btn btn-primary ml-2"
        >
          Fetch
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sold</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamically render product rows */}
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td> {/* Product title */}
                  <td>{product.description}</td> {/* Product description */}
                  <td>${product.price.toFixed(2)}</td> {/* Product price */}
                  <td>{product.quantity}</td> {/* Product quantity */}
                  <td>{product.sold}</td> {/* Sold items */}
                  <td>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>{" "}
                  {/* Created date */}
                  <td>
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </td>{" "}
                  {/* Updated date */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sold</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ProductList;
