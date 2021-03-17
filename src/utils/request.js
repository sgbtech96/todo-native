import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ENV from "../../config";

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
    url: `${ENV.BACKEND_BASE_URL}${url}`,
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
