// Note: This file is used to determine which API to use
//       If the server is running, use the local API
//       If the server is not running, use the remote API
//       This is to prevent the client from crashing when the server is not running
//       This is also to prevent the client from crashing when the server is running
//       but the API is not working
const axios = require("axios");

const getAvailableAPI = async () => {
  let api = "https://localhost:5001/";
  const response = await axios
    .get(`${api}health`)
    .then((res) => {
      if (res.status === 200) {
        api = "https://localhost:5001/";
      }
      api = "https://gepswu-server.onrender.com/";
      return api;
    })
    .catch((err) => {
      api = "https://gepswu-server.onrender.com/";
      return api;
    });
  return api;
};

export const API = getAvailableAPI();
export default API;
