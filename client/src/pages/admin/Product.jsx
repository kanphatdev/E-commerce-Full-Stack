import { useEffect } from "react";
import FormProduct from "../../components/admin/FormProduct";
import useEcomStore from "../../store/ecomerce-store";
import { PackageSearch, PackageX } from "lucide-react";
import { Link } from "react-router-dom";

const Product = () => {
  const token = useEcomStore((state) => state.token);
  const getProduct = useEcomStore((state) => state.getProduct);
  const getCategory = useEcomStore((state) => state.getCategory);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getCategory(token);
    getProduct(token, 30); // Assuming `30` is the categoryId or limit for fetching products
  }, [getCategory, getProduct, token]);

  return (
    <div className="p-6">
      <FormProduct />
      <div className="divider divider-success capitalize">Product List</div>
      <div className="overflow-x-auto">
        <table className="table table-xs w-full">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Product Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
              <th className="p-2">Sold</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Action</th>
              <th className="p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-base-300">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    {product.images.length > 0 ? (
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={product.images[0].url} alt={`Product ${product.title}`} />
                        </div>
                      </div>
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.sold}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-error text-white">
                        <PackageX className="w-4 h-4" />
                      </button>
                      <button className="btn btn-xs btn-info text-white">
                        <Link to={`/admin/product/${product.id}`}>
                          <PackageSearch className="w-4 h-4" />
                        </Link>
                      </button>
                    </div>
                  </td>
                  <td className="p-2">{new Date(product.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-secondary text-white">
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Product Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
              <th className="p-2">Sold</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Action</th>
              <th className="p-2">Created At</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Product;
