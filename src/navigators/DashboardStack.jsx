import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoScreen from "../screens/TodoScreen";
import EditScreen from "../screens/EditScreen";
import { connect } from "react-redux";

const DashboardStack = createStackNavigator();
const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator headerMode="none">
      <DashboardStack.Screen name="Todo" component={TodoScreen} />
      <DashboardStack.Screen name="Edit" component={EditScreen} />
    </DashboardStack.Navigator>
  );
};

export default connect(null, {})(DashboardStackScreen);
