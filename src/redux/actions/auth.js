import { handleLoading, handleData, handleError } from "../../utils/handlers";
import * as Types from "../actionTypes/auth";
import { get, post } from "../../utils/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const googleLogin = (idToken) => async (dispatch) => {
  dispatch(handleLoading(Types.LOGIN_STATUS_REQUEST));
  console.log("login action");
  try {
    const res = await post(`/api/v1/onboarding/googleLogin`, { idToken });
    if (res.type === "success") {
      await AsyncStorage.setItem("id_token", res.data.token);
      dispatch(handleData(Types.LOGIN_STATUS_SUCCESS, true));
    } else throw new Error();
  } catch (e) {
    dispatch(handleError(Types.LOGIN_STATUS_FAILED, e));
  }
};

export const updateLoginStatus = () => {
  return handleData(Types.LOGIN_STATUS_SUCCESS, true);
};

export const handleLogout = () => async (dispatch) => {
  dispatch(handleLoading(Types.LOGIN_STATUS_REQUEST));
  try {
    const res = await get(`/api/v1/onboarding/logout`);
    dispatch({ type: "TOGGLE_SPINNER", payload: false });
    if (res.type === "success") {
      console.log(res);
      await AsyncStorage.removeItem("id_token");
      dispatch(handleData(Types.LOGIN_STATUS_SUCCESS, false));
    }
  } catch (e) {
    dispatch(handleError(Types.LOGIN_STATUS_FAILED, e));
  }
};
