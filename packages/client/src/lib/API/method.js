import axios from "axios";
import log from "../log";

import { API } from "./baseapi";

export async function get(url) {
  try {
    const response = await axios.get(API + url);
    log(
      "GET",
      `${url} - ${response?.status} : ${response?.data?.message}`,
      "info"
    );
    return response?.data?.data;
  } catch (error) {
    
    log(
      "GET",
      `${url} - ${error?.response?.status} : ${error?.response?.data?.message}`,
      "error"
    );
    return response?.data.status;
  }
};

export async function post(url, data) {
  try {
    const response = await axios.post(API + url, data);
    log('POST', `${url} - ${response?.status} : ${response?.data?.message}`, 'info');
    return response?.data;
  } catch (error) {
    log(
      "POST",
      `${url} - ${error?.response?.status} : ${error?.response?.data?.message}`,
      "error"
    );
    return error?.response?.data;
  }
};