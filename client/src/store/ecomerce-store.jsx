import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ListCategory } from "../api/Category";
import { toast } from "react-toastify";
import { listProduct } from "../api/product";
const ecomStore = (set) => ({
  user: null,
  token: null,
  categories:[],
  products:[],
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
   getCategory : async (token) => {
    try {
      const res = await ListCategory(token);
      set({categories:res.data});
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  },
  getProduct : async (token,count) => {
    try {
      const res = await listProduct(token,count);
      set({products:res.data});
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  }
});
const usePersist = {
  name: "ecom-stores",
  storage: createJSONStorage(() => localStorage),
};
const useEcomStore = create(persist(ecomStore, usePersist));
export default useEcomStore;
