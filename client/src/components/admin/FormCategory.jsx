import { useState } from "react";
import useEcomStore from "../../store/ecomerce-store";
import { toast } from "react-toastify";
import { createCategory } from "../../api/Category";
import { Plus } from "lucide-react";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState('');
  const getCategory = useEcomStore((state) => state.getCategory)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name);
      await createCategory(token, { name });
      toast.success("Category added successfully!");
      setName(''); // Reset the input field on success
      getCategory(token)
    } catch (error) {
      console.log(error);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-100 rounded-lg shadow-md border border-base-300 max-w-md">
      <h1 className="text-2xl font-semibold text-primary mb-4">Category Management</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Input Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base-content">Category Name</span>
          </label>
          <input
            type="text"
          
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="input input-bordered w-full bg-base-200 text-base-content"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full flex items-center justify-center space-x-2">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </form>
    </div>
  );
};

export default FormCategory;
