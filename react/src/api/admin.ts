import axios from "utils/axios";

export const login = async (userId: string): Promise<string> => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/token`, {
      userId,
    });
    return response.data.token;
  } catch (error) {
    console.log("Error geting token:", error);
    throw new Error("Unable to get authorization token");
  }
};
