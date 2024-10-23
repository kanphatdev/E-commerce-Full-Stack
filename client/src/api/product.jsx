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
  try {
    // Make the request and return the response data
    const response = await axios.get(`http://localhost:5000/api/products/${count}`);
    return response.data; // Return only the data (assuming response is structured this way)
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products"); // Handle errors appropriately
  }
};


