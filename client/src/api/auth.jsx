import axios from "axios";

export const currentUser = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/current-user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const currentAdmin = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/current-admin",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current admin:", error);
    throw error;
  }
};
