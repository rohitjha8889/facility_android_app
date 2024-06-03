import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  BackHandler
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import Slider from "../components/Slider";
import AttendanceStack from "./Organization";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Organization from "./Organization";
import Employee from "./Employee";
import AttendanceDetails from "./AttendanceDetails";
import AddStaff from "./AddStaff";
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from "../Data/DataContext";
// import Salary from "./Salary";

const DashboardScreen = () => {
  const [employeeName, setEmployeename] = useState('')
  const [attendancePermission, setattendancePermission] = useState('')
  // const [unifor]

  const { fetchData, userDetail } = useContext(DataContext)

  // useEffect(() => {
  //   getEmployeeData();
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     handleBackPress
  //   );

  //   return () => backHandler.remove();
  // }, []);



  const navigation = useNavigation();

  const handleImageContainerPress = () => {
    navigation.navigate(Organization);
  };

  const handleSalary = () => {
    navigation.navigate(Salary)
  }

  useEffect(() => {
    getEmployeeData()
  }, [])

  const getEmployeeData = async () => {
    try {
      const employeeData = await AsyncStorage.getItem('employeeData');
      if (employeeData) {
        const parsedData = JSON.parse(employeeData);
        // console.log(parsedData)
        if (parsedData.employeeName) {
          setEmployeename(parsedData.employeeName);
          setattendancePermission(parsedData.attendancePermission)
        } else {
          console.error('Employee name not found in employee data:', parsedData);
        }
      } else {
        console.error('No employee data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving employee data from AsyncStorage:', error);
    }
  };

  const showServiceUnavailableAlert = () => {
    Alert.alert(
      'Service Unavailable',
      'Sorry, the service is not available right now. Please stay tuned for updates.',
      [{ text: 'OK' }]
    );
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title1}>Hi {employeeName} 👋</Text>

        <TouchableOpacity activeOpacity={1} style={styles.bottomBarButton}>
          <EvilIcons name="search" size={30} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* <Slider /> */}
      {/* All Main */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          {/* Repeat the above Text components with your content */}

          {attendancePermission === 'YES' && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.imagecointainer}
              onPress={handleImageContainerPress}
            >
              <FontAwesome name="calendar" size={30} style={styles.mainIcon} />
              <Text style={styles.text}>Attendance</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            onPress={showServiceUnavailableAlert}
          >
            <FontAwesome5 name="tshirt" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Uniform</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            onPress={showServiceUnavailableAlert}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Joining</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            onPress={showServiceUnavailableAlert}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Complaints</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            onPress={showServiceUnavailableAlert}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Salary</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            onPress={showServiceUnavailableAlert}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Joining</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator()

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardHome"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Organization"
      component={Organization}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Employee"
      component={Employee}
      options={{ headerShown: false }}
    />


    <Stack.Screen
      name="AttendanceDetails"
      component={AttendanceDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="AddStaff"
      component={AddStaff}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);


export default DashboardStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#FFF",
    // marginTop: 25,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    height: 60,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title1: {
    fontSize: 18,
    color: "#184562",
  },
  searchIcon: {
    color: "#184562",
  },
  mainIcon: {
    color: "#fff",
  },
  content: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    width: "95%",
    margin: 20,
  },
  imagecointainer: {
    width: "30%",
    height: 100,
    backgroundColor: "#184562",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
});
