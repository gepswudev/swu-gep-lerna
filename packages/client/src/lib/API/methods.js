import axios from "axios";
import log from "../log";
import { API } from "./baseapi";


export async function get(url, headers = {}) {
  try {
    const response = await axios.get(API + url, {headers});
    log(
      "GET",
      `${url} - ${response?.status} : ${response?.data?.message}`,
      "info"
    );
    return response?.data;
  } catch (error) {
    
    log(
      "GET",
      `${url} - ${error?.response?.status} : ${error?.response?.data?.message}`,
      "error"
    );
    return error?.response?.data;
  }
};

export async function post(url, data, headers = {}) {
  try {
    const response = await axios.post(API + url, data, {headers});
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


export async function put(url, data, headers = {}) {
  try {
    const response = await axios.put(API + url, data , {headers});
    log('PUT', `${url} - ${response?.status} : ${response?.data?.message}`, 'info');
    return response?.data;
  } catch (error) {
    log(
      "PUT",
      `${url} - ${error?.response?.status} : ${error?.response?.data?.message}`,
      "error"
    );
    return error?.response?.data;
  }
}

export async function del(url, headers = {}) {
  try {
    const response = await axios.delete(API + url, {headers});
    log('DELETE', `${url} - ${response?.status} : ${response?.data?.message}`, 'info');
    return response?.data;
  } catch (error) {
    log(
      "DELETE",
      `${url} - ${error?.response?.status} : ${error?.response?.data?.message}`,
      "error"
    );
    return error?.response?.data;
  }
}
