import * as Types from "../actionTypes/profile";

export const setUserProfile = (user) => {
  return {
    type: Types.SET_USER_PROFILE_SUCCESS,
    payload: { data: { ...user } },
  };
};
