import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./src/redux/store";
import Root from "./src/root";

const store = makeStore();

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
