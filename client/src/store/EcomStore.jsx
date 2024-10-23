import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { listCategory } from "../api/category";
import { listProduct } from "../api/product";

const ecomStore = (set) => ({
  user: null,
  token: null,
  categories: [],
  products: [],

  // Action to login a user
  actionLogin: async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      if (res.status === 200 && res.data) {
        set({
          user: res.data.payload,  // Assuming payload contains user information
          token: res.data.token,    // Assuming token is part of response data
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
  },

  // Action to fetch categories
  getCategory: async (token) => {
    try {
      const categories = await listCategory(token); // Fetch categories from API
      set({ categories }); // Update state with the fetched categories
      return categories; // Return categories for further use if needed
    } catch (error) {
      toast.error("Error fetching categories");
      console.error("Error fetching categories:", error);
      set({ categories: [] }); // Set categories to an empty array if there's an error
      return [];
    }
  },

  // Action to fetch products
  getProduct: async (count = 20) => { // Default count to 20 if not provided
    set({ products: [] }); // Reset products state before fetching
    try {
      const productData = await listProduct(count); // Fetch products from API
      set({ products: productData }); // Update state with the fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products"); // Notify user of the error
    }
  },
});

// Persist configuration
const usePersist = {
  name: "ecommerce", // Name for the persisted store
  storage: createJSONStorage(() => localStorage), // Local storage for persisting the store
};

export const useEcomStore = create(persist(ecomStore, usePersist));
