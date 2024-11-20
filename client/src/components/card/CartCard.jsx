import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

const CartCard = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {/* Card */}
        
        <div className="card shadow-md bg-warning rounded-lg p-4">
          {/* row 1 */}
          <div className="flex justify-between mb-4">
            {/* Left */}
            <div className="flex gap-4 items-center">
              <div className="avatar placeholder">
                <div className="w-16 h-16 bg-emerald-200 rounded-md flex items-center justify-center text-gray-700">
                  No Image
                </div>
              </div>
              <div>
                <p className="font-bold text-lg">Title</p>
                <p className="text-sm text-gray-600">Description</p>
              </div>
            </div>
            {/* Right */}
            <button className="btn btn-error btn-xs">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {/* row 2 */}
          <div className="flex justify-between items-center">
            {/* left */}
            <div className="flex items-center space-x-2">
              <button className="btn btn-neutral btn-sm">
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold">1</span>
              <button className="btn btn-neutral btn-sm">
                <Minus className="w-4 h-4" />
              </button>
            </div>
            {/* right */}
            <div className="font-bold text-neutral text-lg">฿1,000</div>
          </div>
        </div>
        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="capitalize font-bold text-lg">Total</span>
          <span className="font-bold text-lg text-gray-800">฿1,000</span>
        </div>
        {/* Payment Button */}
        <button className="btn btn-success btn-wide flex items-center gap-2">
          Proceed with Payment <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
