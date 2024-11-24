import {
  Asterisk,
  Container,
  CreditCard,
  MapPinHouse,
  Truck,
} from "lucide-react";
import useEcomStore from "../../store/ecomerce-store";
import { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SummaryCard = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    handleGetUserCart(token);
  }, []);
  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSaveAddress = () => {
    if (!address.trim()) {
      toast.warning("Address cannot be empty! Please provide a valid address.");
      return;
    }

    saveAddress(token, address)
      .then((res) => {
        console.log(res);
        setAddressSaved(true); // Set the addressSaved flag
        toast.success("Address saved successfully!");
      })
      .catch((error) => {
        toast.error("Failed to save the address. Please try again.", error);
      });
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Shipping Address Section */}
        <div className="bg-info p-6 card shadow-lg rounded-lg space-y-4">
          <h1 className="flex gap-2 items-center capitalize font-bold text-xl md:text-2xl">
            Shipping Address <Truck className="w-8 h-8" />
          </h1>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            placeholder="Enter your address here"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <button
            onClick={handleSaveAddress}
            className="btn btn-secondary w-full md:w-auto uppercase flex gap-2 justify-center"
          >
            Save Shipping Address <MapPinHouse />
          </button>
          {addressSaved && (
            <p className="text-sm text-green-600 mt-2">
              Address saved successfully!
            </p>
          )}
        </div>

        {/* Right Section - Summary */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-neutral p-6 card shadow-lg rounded-lg space-y-6 text-neutral-content">
            <h1 className="capitalize font-bold text-xl md:text-2xl flex items-center gap-2">
              Summary <Container className="w-8 h-8" />
            </h1>

            {/* Item List */}
            {products?.map((item, index) => (
              <div className="space-y-4" key={index}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold capitalize">
                      {item.product.title}
                    </p>
                    <p className="text-lg font-bold capitalize flex gap-2 items-center">
                      Quantity: {item.count} <Asterisk className="w-4 h-4" />{" "}
                      {item.product.price}
                    </p>
                  </div>
                  <p className="font-bold text-lg">
                    ฿{item.count * item.product.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="divider"></div>

            {/* Cost Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-lg font-bold capitalize">Shipping Costs</p>
                <p className="font-bold">฿0.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-bold capitalize">Discount</p>
                <p className="font-bold">฿0.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-bold capitalize">Net Total</p>
                <p className="font-bold">฿{cartTotal}</p>
              </div>
            </div>

            <button
              disabled={!addressSaved}
              onClick={() =>  navigate("/user/payment")}
              className="btn btn-accent w-full md:w-auto flex items-center justify-center gap-2"
            >
              Proceed with Payment <CreditCard />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
