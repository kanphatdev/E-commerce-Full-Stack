import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecomerce-store";
import { BookMarked } from "lucide-react";
const SearchCart = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionsearchFilters = useEcomStore(
    (state) => state.actionsearchFilters
  );

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  useEffect(() => {
    getCategory();
  }, []);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  // Step 1: Search by text function
  useEffect(() => {
    const delay = setTimeout(() => {
     
      if (text) {
        actionsearchFilters({ query: text });
      }else{
         getProduct(30);
      }
    }, 300);

    // Cleanup function to clear timeout
    return () => clearTimeout(delay);
  }, [text, actionsearchFilters, getProduct]);
  // Step 2: Search by categories function
  const handleCheck = (e) => {
    console.log(e.target.value);
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.slice(findCheck, 1);
    }
    setCategorySelected(inState)
  
    if (inState > 0) {
        actionsearchFilters({category:inState})
    }else{
      getProduct()
    }
  };
  console.log(categorySelected);
  
  return (
    <div>
      <h1 className="capitalize text-lg font-bold mb-4">Find the Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        className="input w-full max-w-xs mb-4 px-2"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="divider "></div>
      <div className="collapse bg-base-100 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-sm capitalize font-medium flex gap-4 items-center justify-between">
          all categories <BookMarked />{" "}
        </div>
        <div className="collapse-content">
          {categories.map((item, index) => (
            <div className="flex gap-4 py-2" key={index}>
              <input
                type="checkbox"
                className="checkbox"
                value={item.id}
                onChange={handleCheck}
              />
              <span className="badge capitalize">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCart;
