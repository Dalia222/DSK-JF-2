import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const register = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/register", credentials);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
};
