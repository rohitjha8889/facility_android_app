import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"



import Organization from "./Attendance/Organization";
import Employee from "./Attendance/Employee";
import Login from "./Login";
import Otp from "./Otp";
import Notification from "./Notification";
import Helpline from "./Helpline";
import Account from "./Account";
import AttendanceDetails from "./Attendance/AttendanceDetails";
import Dashboard from "./Dashboard";
// import Salary from "./Salary";
import AddStaff from "./Attendance/AddStaff";
import DashboardStack from "./Dashboard";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import CheckList from "./CheckList";
import SplashScreen from "../components/SplashScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 55,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5
      },
      tabBarActiveTintColor: '#0a66c2',
      tabBarInactiveTintColor: '#a4a4a4',
      tabBarLabelStyle: {
        fontSize: 14,
      }
    }}
  >
    <Tab.Screen
      name="Home"
      component={DashboardStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" color={color} size={22} />
        ),
      }}
    />
    <Tab.Screen
      name="Notification"
      component={Notification}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications-outline" color={color} size={22} />
        ),
      }}
    />
    <Tab.Screen
      name="Helpline"
      component={Helpline}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="call" color={color} size={22} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name="user" color={color} size={22} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AllScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        {/* <Stack.Navigator>/ */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

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
          name="OTPScreen"
          component={Otp}
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
