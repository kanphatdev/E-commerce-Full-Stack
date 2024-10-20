import axios from "axios";

export const createCategory = async ( token,formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/category",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token, // Ensure token is passed correctly
        },
      }
    );
    return response.data; // Return the actual response data
  } catch (error) {
    console.error("Error creating category:", error);
    throw error.response?.data || "Error creating category"; // Return error message for better handling
  }
};


export const listCategory = async (token) => {
  try {
    // Make the GET request to fetch categories
    const response = await axios.get(
      "http://localhost:5000/api/category",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed correctly
        },
      }
    );

    return response.data; // Return the actual response data
  } catch (error) {
    console.error("Error fetching categories:", error);

    // Throw a more meaningful error for better error handling
    throw error.response?.data?.message || "Error fetching categories";
  }
};
export const removeCategory = async (token, id) => {
  try {
    // Make the DELETE request to remove a category by ID
    const response = await axios.delete(
      `http://localhost:5000/api/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed correctly
        },
      }
    );

    return response.data; // Return the response data (success message or confirmation)
  } catch (error) {
    console.error("Error deleting category:", error);

    // Throw a more meaningful error for better error handling
    throw error.response?.data?.message || "Error deleting category";
  }
};
