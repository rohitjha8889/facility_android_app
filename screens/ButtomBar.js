import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Notification from "./Notification";
import Dashboard from "./DashboardScreen ";
import Helpline from "./Helpline";
import Account from "./Account";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={{
          tabBarLabel: "DashboardScreen",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Helpline"
        component={Helpline}
        options={{
          tabBarLabel: "Helpline",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="old-phone" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
