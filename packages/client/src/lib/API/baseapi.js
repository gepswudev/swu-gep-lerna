// Note: This file is used to determine which API to use
//       If the server is running, use the local API
//       If the server is not running, use the remote API
//       This is to prevent the client from crashing when the server is not running
//       This is also to prevent the client from crashing when the server is running
//       but the API is not working

const getAvailableAPI = () => {
    if(window.location.hostname === "localhost") {
        return "http://localhost:5001/";
    }
    return "https://gepswu-server.onrender.com/";
};

export const API = getAvailableAPI();
export default API;
