import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStackScreen from "./navigators/AuthStack";
import DashboardStackScreen from "./navigators/DashboardStack";
import { connect } from "react-redux";
import { updateLoginStatus } from "./redux/actions/auth";

function Root({ isLoggedIn, updateLoginStatus }) {
  const [spinning, setSpinning] = useState(true);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("id_token");
    if (token) updateLoginStatus();
    setSpinning(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    // console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return spinning ? (
    <ActivityIndicator size="large" />
  ) : (
    <NavigationContainer>
      {isLoggedIn ? <DashboardStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loginStatus.data,
  };
};

export default connect(mapStateToProps, { updateLoginStatus })(Root);
