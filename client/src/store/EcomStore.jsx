import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { listCategory } from "../api/category";

const ecomStore = (set) => ({
  user: null,
  token: null,
  categories: [],
  products: [], // Add products state
  loading: false, // Add loading state
  error: null, // Add error state

  // Action to fetch products
  fetchProducts: async (quantity) => {
    set({ loading: true }); // Start loading
    try {
      const token = get().token; // Get the current token
      const response = await axios.get(`http://localhost:5000/api/products/${quantity}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed correctly
        },
      });
      set({ products: response.data, error: null }); // Set fetched products to state
    } catch (err) {
      console.error("Error fetching products:", err);
      set({ error: "Failed to load products" });
    } finally {
      set({ loading: false }); // Stop loading regardless of success or failure
    }
  },

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
});

// Persist configuration
const usePersist = {
  name: "ecommerce", // Name for the persisted store
  storage: createJSONStorage(() => localStorage), // Local storage for persisting the store
};

export const useEcomStore = create(persist(ecomStore, usePersist));
