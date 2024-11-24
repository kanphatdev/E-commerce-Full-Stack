import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ListCategory } from "../api/Category";
import { toast } from "react-toastify";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";
const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    // Step Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    console.log(uniqe);
    
    set({ carts: uniqe });
  },
  actionRemoveProduct: (productId) => {
    // console.log("actionRemoveProduct", productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
 getTotalPrice: () => {
    return get().carts.reduce((total,item) => {
      return total + item.price * item.count
    },0)
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Clickkkkk', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionLogin: async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      if (res.status === 200 && res.data) {
        set({
          user: res.data.payload, // Assuming payload contains user information
          token: res.data.token, // Assuming token is part of response data
        });
        return res; // Successful login
      } else {
        throw new Error("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message || "Login failed" };
    }
  },
  getCategory: async () => {
    try {
      const res = await ListCategory();
      set({ categories: res.data });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  },
  actionsearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load searchFilters");
    }
  },
});
const usePersist = {
  name: "ecom-stores",
  storage: createJSONStorage(() => localStorage),
};
const useEcomStore = create(persist(ecomStore, usePersist));
export default useEcomStore;
