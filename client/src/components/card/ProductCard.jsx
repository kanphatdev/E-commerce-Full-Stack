import { BookX, ShoppingBasket } from "lucide-react";

const ProductCard = ({ item }) => {
  return (
    <div className="card rounded-md shadow-md card-compact bg-base-300 w-80 ">
      <div className="card-body ">
        <div className="">
          {item.images && item.images.length > 0 ? (
            <figure>
              <img
                src={item.images[0].url}
                alt="Shoes"
                className="w-full  rounded-md object-cover h-32 hover:scale-110 transition hover:duration-200 "
              />
            </figure>
          ) : (
            <figure>
              <div className="w-full rounded-md text-center flex items-center justify-center gap-4 capitalize text-error">
                no images on this product card <BookX />
              </div>
            </figure>
          )}
        </div>
        <div className="">
          <h2 className="card-title text-sm py-2">
            {item.title}
            <div className="badge badge-secondary text-xs font-bold">
              {item.price}฿
            </div>
          </h2>
          <p className="text-xs py-4">{item.description}</p>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary">
            Buy Now <ShoppingBasket />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
