import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import useEcomStore from "../../store/ecomerce-store";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(formData);  // Pass formData to the actionLogin function
const role = res.data.payload.role;
      if (res.status === 200 || res.status === 201) {
        toast.success("Login successful!");

        // Redirect based on user role
        
        roleRedirect(role);
      } else {
        toast.error(res.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      // More detailed error messaging based on the response
      const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
      toast.error(errorMessage);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-accent shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/register" className="link link-hover">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;