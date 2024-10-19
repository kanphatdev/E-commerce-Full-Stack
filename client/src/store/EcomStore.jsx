import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

const ecomStore = (set) => ({
  user: null,
  token: null,

  // Action to login a user
  actionLogin: async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);

      if (res.status === 200 && res.data) {
        set({
          user: res.data.payload,  // Adjust based on actual structure
          token: res.data.token,   // Adjust based on actual structure
        });
        return res;  // Successful login
      } else {
        throw new Error("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message || "Login failed" };
    }
  },

  // Action to register a user
  actionRegister: async (formData, navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/register", formData);
      
      // Check response and notify user
      if (res.status === 200) {
        toast.success("Registration successful!");
        navigate("/login"); // Redirect to login after successful registration
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Failed to register. Please try again.");
    }
  }
});

const usePersist = {
  name: 'ecommerce', // Name for the persisted store
  storage: createJSONStorage(() => localStorage),
};

export const useEcomStore = create(persist(ecomStore, usePersist));
