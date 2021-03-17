import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoScreen from "../screens/TodoScreen";
import EditScreen from "../screens/EditScreen";
import { Button } from "react-native";
import { get } from "../utils/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { handleLogout } from "../redux/actions/auth";

const DashboardStack = createStackNavigator();
const DashboardStackScreen = ({ handleLogout }) => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          headerRight: () => (
            <Button onPress={() => handleLogout()} title="Logout" />
          ),
        }}
      />
      <DashboardStack.Screen name="Edit" component={EditScreen} />
    </DashboardStack.Navigator>
  );
};

export default connect(null, { handleLogout })(DashboardStackScreen);
