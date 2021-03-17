import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./src/redux/store";
import Root from "./src/root";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const store = makeStore();

function App() {
  const [isReady, setIsReady] = useState(false);

  const initializeNativeBase = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setIsReady(true);
  };
  useEffect(() => {
    initializeNativeBase();
  }, []);

  return isReady ? (
    <Provider store={store}>
      <Root />
    </Provider>
  ) : (
    <ActivityIndicator size="large" />
  );
}

export default App;
