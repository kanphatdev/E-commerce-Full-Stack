import { toast } from "react-toastify";
import { RemoveCategory } from "../../api/Category";
import FormCategory from "../../components/admin/FormCategory";
import useEcomStore from "../../store/ecomerce-store";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

const Category = () => {

  const token = useEcomStore((state) => state.token);
const categories = useEcomStore((state) => state.categories)
const getCategory = useEcomStore((state) => state.getCategory)

  const handleRemove = async (id) => {
    console.log(id);
    try {
     const res = await RemoveCategory(token, id);
     console.log(res);
     getCategory(token)
      toast.success("Removed category successfully")
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getCategory(token);
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      {/* Category Form */}
      <FormCategory />
      
      {/* Divider */}
      <div className="divider my-6"></div>
      
      {/* Categories List */}
      <div className="bg-base-100 p-4 rounded-lg shadow-md border border-base-300 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-primary mb-4">Categories</h2>
        
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <div key={item.id} className="flex items-center justify-between bg-secondary p-3 rounded-md mb-3 shadow-sm">
              {/* Category Name */}
              <div className="text-base-content font-medium">
                {index + 1}. {item.name}
              </div>
              
              {/* Delete Button */}
              <button
                className="btn btn-error btn-sm flex items-center space-x-1"
                onClick={() =>handleRemove(item.id)}
              >
                <Trash size={16} />
                <span>Delete</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-base-content">No categories available</p>
        )}
      </div>
    </div>
  );
};

export default Category;
