import axios from "axios";
import { API } from "./baseapi";

export async function checkConnection() {
  try {
    const response = await axios.get(`${API}health`);
    return response?.status === 200;
  } catch (error) {
    return false;
  }
}
