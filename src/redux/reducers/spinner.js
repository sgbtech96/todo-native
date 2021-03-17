const initialState = false;
const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SPINNER":
      return action.payload;
    default:
      return state;
  }
};
export default spinnerReducer;
