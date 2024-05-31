import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Employee from "./Employee";
import AddStaff from "./AddStaff";
import AttendanceDetails from "./AttendanceDetails";
const Stack = createStackNavigator();
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DataContext } from "../Data/DataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Organization = () => {
  const navigation = useNavigation();
  const [selectedClient, setSelectedClient] = useState("Select Client");
  const [selectedDesignation, setSelectedDesignation] =
    useState("Select Designation");
  const [isClientClicked, setIsClientClicked] = useState(false);
  const [isDesignationClicked, setIsDesignationClicked] = useState(false);
  const [searchInputClient, setSearchInputClient] = useState("");
  const [searchInputDesignation, setSearchInputDesignation] = useState("");

  const [availableService, setAvailableService] = useState([]); // Initialize as an empty array

  const { services, allClient } = useContext(DataContext)

  const [permitedOrganization, setPermitedOrganization] = useState()

  useEffect(()=>{
    getEmployeeData()
  },[])

  const getEmployeeData = async () => {
    try {
      const employeeData = await AsyncStorage.getItem('employeeData');
      if (employeeData) {
        const parsedData = JSON.parse(employeeData);
        // console.log(parsedData);
        if (parsedData.employeeName) {
          if (parsedData.service === 'Field Executive') {
            setPermitedOrganization('');
          } else {
            setPermitedOrganization(parsedData.hospitalName);
          }
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

  const handleButtonPressBack = () => {
    navigation.navigate("DashboardScreen");
  };

  const handleSelectClient = (selectedHospital) => {
    if (permitedOrganization && permitedOrganization !== selectedHospital) {
      Alert.alert("Permission Denied", "You do not have permission to make attendance for this hospital.");
      return;
    }
    
    setSelectedClient(selectedHospital);
    setIsClientClicked(false);
  
    // Filter data to get services for the selected hospital
    const selectedHospitalServices = allClient
      .filter(item => item.hospitalName === selectedHospital)
      .map(item => item.service);
  
    setAvailableService(selectedHospitalServices);
  };

  const handleSelectDesignation = (item) => {
    setSelectedDesignation(item);
    setIsDesignationClicked(false);
  };

  const handleButtonPress = () => {
    if (
      selectedClient === "Select Client" ||
      selectedDesignation === "Select Designation"
    ) {
      Alert.alert("Please select both client and designation options");
    } else if (availableService.length === 0) {
      Alert.alert("Please select an organization");
    } else {
      navigation.navigate("Employee", {selectedClient, selectedDesignation});
    }
  };

  const handleBack = () => {
    navigation.navigate("DashboardHome");
  };

  return (
    <View style={styles.dropdownCointainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesome
            name="chevron-left"
            size={18}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.text1}>Attendance</Text>
        </View>
      </View>

      <View style={styles.allDropDown}>
        <Text style={styles.heading}>Select Organization</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.dropdownSelector}
          onPress={() => {
            setIsClientClicked(!isClientClicked);
            setIsDesignationClicked(false);
          }}
        >
          <Text>{selectedClient}</Text>
          <Image
            source={
              isClientClicked
                ? require("../images/upload.png")
                : require("../images/dropdown.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        {isClientClicked && (
          <View style={styles.dropdownArea}>
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              value={searchInputClient}
              onChangeText={(text) => setSearchInputClient(text)}
            />
            <FlatList
              data={Array.from(new Set(allClient.map(item => item.hospitalName))) // Get unique hospital names
                .filter(hospitalName =>
                  hospitalName.toLowerCase().includes(searchInputClient.toLowerCase())
                )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.optionItem}
                  onPress={() => handleSelectClient(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>

      <Text style={styles.heading}>Select Designation</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.dropdownSelector}
        onPress={() => {
          setIsDesignationClicked(!isDesignationClicked);
          setIsClientClicked(false);
        }}
      >
        <Text>{selectedDesignation}</Text>
        <Image
          source={
            isDesignationClicked
              ? require("../images/upload.png")
              : require("../images/dropdown.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      {isDesignationClicked && (
        <View style={styles.dropdownArea1}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchInputDesignation}
            onChangeText={(text) => setSearchInputDesignation(text)}
          />
          <FlatList
            data={availableService.filter((option) =>
              option.toLowerCase().includes(searchInputDesignation.toLowerCase())
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.optionItem}
                onPress={() => handleSelectDesignation(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList} // Add this style if needed
          />
        </View>
      )}

      <View style={styles.allbutton}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleButtonPressBack}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Organization;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 25,
    backgroundColor: "#184562",
    padding: 10,
    height: 50,
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    alignItems: "center",
  },
  text1: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  menuIcon: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    alignSelf: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#184562",
    marginTop: 20,
  },
  dropdownSelector: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  allDropDown: {
    marginTop: 20,
  },
  icon: {
    width: 15,
    height: 15,
  },
  dropdownArea: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
    position: "absolute",
    top: 80,
    zIndex: 1,
  },
  dropdownArea1: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
    position: "absolute",
    top: 280,
    zIndex: 1,
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8e8e8e",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#184562",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
    position: "relative",
    zIndex: -1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  allbutton: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    marginTop: 20,
  },
});
