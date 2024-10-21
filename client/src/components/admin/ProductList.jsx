import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEcomStore } from "../../store/EcomStore";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios

const ProductList = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [quantity, setQuantity] = useState(30); // Default quantity

  // Fetch products when the component mounts or quantity changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${quantity}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed correctly
          },
        });
        setProducts(response.data); // Set fetched products to state
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [token, quantity]); // Dependency array to rerun effect if token or quantity changes

  // Render loading or error message
  if (loading) {
    return <p>Loading...</p>;
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
        <label htmlFor="quantity" className="mr-2">Number of Products:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="input input-bordered w-24"
        />
        <button onClick={() => setQuantity(quantity)} className="btn btn-primary ml-2">Fetch</button>
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
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td> {/* Created date */}
                  <td>{new Date(product.updatedAt).toLocaleDateString()}</td> {/* Updated date */}
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
