import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecomerce-store";

const SearchCart = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionsearchFilters = useEcomStore((state) => state.actionsearchFilters);
  const [text, setText] = useState("");

  // Step 1: Search by text function
  useEffect(() => {
    const delay = setTimeout(() => {
      actionsearchFilters({ query: text });
      if (!text) {
        getProduct(30);
      }
    }, 300);

    // Cleanup function to clear timeout
    return () => clearTimeout(delay);
  }, [text, actionsearchFilters, getProduct]);

  return (
    <div>
      <h1 className="capitalize text-lg font-bold mb-4">Find the Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        className="input w-full max-w-xs mb-4 px-2"
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default SearchCart;
