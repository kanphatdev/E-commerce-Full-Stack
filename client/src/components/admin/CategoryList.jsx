import { BookmarkPlus, BookmarkX } from "lucide-react";
import { Link } from "react-router-dom";
import { useEcomStore } from "../../store/EcomStore";
import { listCategory, removeCategory } from "../../api/category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CategoryList = () => {
  const token = useEcomStore((state) => state.token);
  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories from API
  const getCategory = async () => {
    try {
      const res = await listCategory(token);
      setCategories(res); // Set the fetched categories
    } catch (error) {
      toast.error("Error fetching categories");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getCategory(); // Fetch categories when token is available
    }
  }, [token]);

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      await removeCategory(token, id); // Pass token first, then the id
      toast.success("Category deleted successfully!");
      getCategory(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Failed to delete category.");
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold capitalize">Categories</h1>

        <Link to={"/admin/add-category/"}>
          <button className="btn btn-accent capitalize flex items-center gap-2">
            Add Category <BookmarkPlus className="w-5 h-5" />
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* Table head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through categories and display each row */}
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr
                    key={category.id || index} // Use index as fallback if id is missing
                    className={index % 2 === 0 ? "bg-base-200" : ""}
                  >
                    <th>{index + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleDelete(category.id)} // Use id for MongoDB objects
                      >
                        <BookmarkX className="text-rose-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
