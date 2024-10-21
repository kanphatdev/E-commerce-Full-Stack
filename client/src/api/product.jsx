import axios from "axios";

// Function to create a product
export const createProduct = async (token, formData) => {
  if (!token) {
    throw new Error("No authorization token provided"); // Check for token
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/product",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed correctly
        },
      }
    );
    return response.data; // Return the actual response data
  } catch (error) {
    console.error("Error creating product:", error);

    // Throw a more meaningful error message for better error handling
    throw error.response?.data?.message || "Error creating product";
  }
};

// Function to list products


export const listProduct = async (count = 20) => {
  // code body
  return await axios.get('http://localhost:5001/api/products/' + count)
}

