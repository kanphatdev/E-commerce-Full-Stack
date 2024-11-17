import { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecomerce-store";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex">
      {/* SearchBar */}
      <div className="w-1/4 bg-base-300 h-screen p-4 rounded-lg">SearchBar</div>
      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl capitalize mb-4 font-bold">all products</p>
        <div className="flex flex-wrap gap-4">
          {/* product card */}
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}

          {/* product card */}
        </div>
      </div>
      {/* Cart */}
      <div className="w-1/4 bg-secondary p-4 h-screen overflow-y-auto rounded-md ">
        Cart
      </div>
    </div>
  );
};

export default Shop;
