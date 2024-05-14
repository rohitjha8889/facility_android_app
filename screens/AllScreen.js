import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "./DashboardScreen ";
import DropDown from "./DropDown";
import Employee from "./Employee";
import AddClient from "./AddClient";
import Login from "./Login";
import Notification from "./Notification";
import Helpline from "./Helpline";
import Account from "./Account";
import AttendanceDetails from "./AttendanceDetails";

const Stack = createStackNavigator();

const AllScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Helpline"
          component={Helpline}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DropDown"
          component={DropDown}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Employee"
          component={Employee}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dropDown"
          component={DropDown}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AttendanceDetails"
          component={AttendanceDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddClient"
          component={AddClient}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AllScreen;
