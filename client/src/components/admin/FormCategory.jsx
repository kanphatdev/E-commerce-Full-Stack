import  { useState } from 'react';
import { useEcomStore } from '../../store/EcomStore';
import { toast } from 'react-toastify';
import { createCategory } from '../../api/category';
import { useNavigate } from 'react-router-dom';

const FormCategory = () => {
  const [name, setName] = useState(''); // Simple string for category name
  const token = useEcomStore((state) => state.token);
const nivigate = useNavigate()
  const handleChange = async(e) => {
    setName(e.target.value); // Set the name directly from input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(token,{name});
try {
 await createCategory(token,{name}) 
 nivigate('/admin/category')
 toast.success("Category added successfully!");
 setName('');
 
} catch (error) {
  console.error(error);
  toast.error(error.response?.data?.message || "Failed to add category");
  
}

  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-full max-w-lg shadow-2xl bg-accent">
        <div className="card-body">
          <h2 className="card-title">Add Category</h2>

          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter category name"
                name="name"
            // Set the input value from state
                onChange={handleChange} // Handle input change
                className="input input-bordered"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral shadow-md">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCategory;
