import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function post(url, data) {
  return makeAPIRequest("POST", url, data).then((res) => res.data);
}

export function put(url, data) {
  return makeAPIRequest("PUT", url, data).then((res) => res.data);
}

export function get(url) {
  return makeAPIRequest("GET", url).then((res) => res.data);
}

async function makeAPIRequest(method, url, data) {
  const token = await AsyncStorage.getItem("id_token");
  const config = {
    method,
    url: `http://192.168.43.35:8000${url}`,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        },
    data,
  };
  return axios(config);
}
