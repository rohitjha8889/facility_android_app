import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Organization from "./Organization";
import Employee from "./Employee";
import Login from "./Login";
import Notification from "./Notification";
import Helpline from "./Helpline";
import Account from "./Account";
import AttendanceDetails from "./AttendanceDetails";
import Dashboard from "./Dashboard";
// import Salary from "./Salary";
import AddStaff from "./AddStaff";
import DashboardStack from "./Dashboard";
import AuthLoadingScreen from "../components/AuthLoadingScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Dashboard"
      component={DashboardStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="tachometer-alt" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Notification"
      component={Notification}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="bell" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Helpline"
      component={Helpline}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Entypo name="old-phone" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" color={color} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AllScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='AuthLoading'> 
      {/* <Stack.Navigator>/ */}

        <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AllScreen;
