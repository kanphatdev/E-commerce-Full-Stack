import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.warning("Warning: Confirm Password does not match.");
      return; // Stop further execution if passwords do not match
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      toast.success("Registration successful!");
      console.log(res);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-md bg-neutral">
        <h2 className="text-2xl font-bold text-center text-primary">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Enter email"
            onChange={handleOnChange}
            value={form.email}
          />
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Enter password"
            onChange={handleOnChange}
            value={form.password}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleOnChange}
            className="input input-bordered w-full"
            value={form.confirmPassword}
          />
          <button className="btn btn-primary w-full" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
