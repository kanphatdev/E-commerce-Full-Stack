import { Asterisk, BaggageClaim, Gift, Key, ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecomerce-store";
import { Link,useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
const navigate = useNavigate()

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        toast.success("Cart saved successfully")
        navigate("/checkout")
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center md:text-left">
        <p className="capitalize text-2xl font-bold mb-4 flex gap-2 items-center justify-center md:justify-start">
          Product List({cart.length}) <ListCheck className="w-6 h-6" />
        </p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* left */}
        <div className="col-span-2 space-y-4">
          {/* Card */}
          {cart.map((item, index) => (
            <div
              className="card shadow-md bg-warning rounded-lg p-4"
              key={index}
            >
              {/* row 1 */}
              <div className="flex justify-between mb-4">
                {/* Left */}
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <div className="avatar placeholder h-16  w-16">
                      <img
                        src={item.images[0].url}
                        alt=""
                        className="w-full h-full object-cover  hover:scale-105 duration-200 transition rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content w-12 rounded-md">
                        <span className="uppercase">p</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="font-bold text-lg">{item.title} </p>
                    <p className="text-sm text-neutral flex">
                      {item.price} <Asterisk /> {item.count}
                    </p>
                  </div>
                </div>
                {/* Right */}
                <div className="font-bold text-neutral text-lg flex items-center justify-center">
                  ฿ {item.price * item.count}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* right */}
        <div className="card bg-neutral p-4 rounded-md shadow-md space-y-4">
          <p className="capitalize text-2xl font-bold">total product</p>
          <div className="flex  justify-between ">
            <span className="font-bold capitalize">total net</span>
            <span className="text-2xl font-bold">{getTotalPrice()} ฿</span>
          </div>
          {user ? (
            <>
              {/* order now button */}
              <Link to={""}>
                <button className="btn btn-block btn-error capitalize" onClick={handleSaveCart}>
                  order now <BaggageClaim />
                </button>
              </Link>
            </>
          ) : (
            <>
              {/* log in button */}
              <Link to={"/login"}>
                <button className="btn btn-block btn-secondary capitalize">
                  log in <Key />
                </button>
              </Link>
            </>
          )}

          {/* edit product button */}
          <Link to={"/shop"}>
            <button className="btn btn-ghost capitalize btn-block">
              edit product <Gift />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
