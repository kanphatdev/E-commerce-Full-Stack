import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecomerce-store";
import { BookMarked } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
  const [price, setPrice] = useState([1000, 10000]);
  const [ok, setOK] = useState(false);
  // Step 1: Search by text function
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionsearchFilters({ query: text });
      } else {
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
    setCategorySelected(inState);

    if (inState > 0) {
      actionsearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  console.log(categorySelected);

  // Step 3: Search by price function
  useEffect(() => {
    actionsearchFilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    console.log(value);
    setPrice(value);
    setTimeout(() => {
      setOK(!ok);
    }, 300);
  };

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
      <div className="divider"></div>
      <div className="">
        <h1 className="text-xl mb-4 capitalize font-bold px-2">
          find the product price
        </h1>
        <div className="">
          <div className="mb-4 flex justify-between">
            <div className="">
              <span className="badge badge-success capitalize">
                min:<span className="font-bold">{price[0]}</span>
              </span>
            </div>
            <div className="">
              <span className="badge badge-error capitalize">
                max: <span className="font-bold">{price[1]}</span>
              </span>
            </div>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={300000}
            defaultValue={[1000, 100000]}
            trackStyle={{ backgroundColor: "#588157", height: 10 }}
            railStyle={{ backgroundColor: "#3a5a40", height: 10 }}
            handleStyle={{
              borderColor: "#dad7cd",
              height: 20,
              width: 20,
              marginLeft: -10,
              marginTop: -5,
              backgroundColor: "#a3b18a",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCart;
