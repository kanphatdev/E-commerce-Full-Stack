import axios from "axios";

export const currentUser = async (token) => {
  if (!token) {
    throw new Error("Token is required to fetch the current user.");
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/current-user",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data; // Return the response data (user information)
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error.response?.data?.message || "Failed to fetch current user.";
  }
};




export const currentAdmin = async (token) => {
  if (!token) {
    throw new Error("Token is required to fetch the current admin.");
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/current-admin",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data; // Return admin data
  } catch (error) {
    console.error("Error fetching current admin:", error);
    throw error.response?.data?.message || "Failed to fetch current admin.";
  }
};

 
