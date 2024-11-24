import React from "react";
import {
  Asterisk,
  Container,
  CreditCard,
  MapPinHouse,
  Truck,
} from "lucide-react";

const SummaryCard = () => {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Shipping Address */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-info p-6 card shadow-lg rounded-lg space-y-4">
            <h1 className="flex gap-2 items-center capitalize font-bold text-xl md:text-2xl">
              Shipping Address <Truck className="w-8 h-8" />
            </h1>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder="Enter your address here"
            ></textarea>
            <button className="btn btn-secondary w-full md:w-auto uppercase flex gap-2 justify-center">
              Save Shipping Address <MapPinHouse />
            </button>
          </div>
        </div>

        {/* Right Section - Summary */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-neutral p-6 card shadow-lg rounded-lg space-y-6 text-neutral-content">
            <h1 className="capitalize font-bold text-xl md:text-2xl flex items-center gap-2">
              Summary <Container className="w-8 h-8" />
            </h1>

            {/* Item List */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold capitalize">Title</p>
                  <p className="text-lg font-bold capitalize flex gap-2 items-center">
                    Quantity: 1 <Asterisk className="w-4 h-4" /> 1,000
                  </p>
                </div>
                <p className="font-bold text-lg">฿1,000</p>
              </div>
            </div>

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
                <p className="font-bold">฿1,000.00</p>
              </div>
            </div>

            <button className="btn btn-accent w-full md:w-auto flex items-center justify-center gap-2">
              Proceed with Payment <CreditCard />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
