import { BookmarkPlus, BookmarkX } from "lucide-react";
import { Link } from "react-router-dom";
import { useEcomStore } from "../../store/EcomStore";
import { removeCategory } from "../../api/category";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CategoryList = () => {
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  // Fetch categories from API when the token is available
  useEffect(() => {
    if (token) {
      getCategory(token); // Ensure token is passed to getCategory
    }
  }, [token]);

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      // Add debug logging
      console.log(`Attempting to delete category with ID: ${id}`);
      
      const response = await removeCategory(token, id); // Pass token first, then the id
      console.log(`Deletion successful: ${response}`); // Log success for debugging
      
      toast.success("Category deleted successfully!");
      getCategory(token); // Refresh the list after deletion
    } catch (error) {
      // Log the entire error for better debugging
      console.error("Error deleting category:", error.response || error.message || error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 mx-4 py-4">
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
                    key={category._id || index} // Use _id for MongoDB objects
                    className={index % 2 === 0 ? "bg-base-200" : ""}
                  >
                    <th>{index + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleDelete(category.id)} // Use _id for MongoDB objects
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
