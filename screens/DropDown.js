import React, { useState } from "react";
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

const DropDown = () => {
  const navigation = useNavigation();
  const [selectedClient, setSelectedClient] = useState("Select Client");
  const [selectedDesignation, setSelectedDesignation] =
    useState("Select Designation");
  const [isClientClicked, setIsClientClicked] = useState(false);
  const [isDesignationClicked, setIsDesignationClicked] = useState(false);
  const [searchInputClient, setSearchInputClient] = useState("");
  const [searchInputDesignation, setSearchInputDesignation] = useState("");

  // Initialize clients and designations
  const [clients, setClients] = useState([
    "Noida Hospital",
    "New Hospital",
    "Old Hospital",
    "Home Service",
    "Supervisor + Security",
    "Supervisor + GDA/HK",
  ]);

  const [designations, setDesignations] = useState([
    "SG",
    "GDA",
    "HK",
    "Receptionist",
    "Supervisor + Security",
    "Supervisor + GDA/HK",
  ]);

  const handleButtonPressBack = () => {
    navigation.navigate("DashboardScreen");
  };

  const handleSelectClient = (item) => {
    setSelectedClient(item);
    setIsClientClicked(false);
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
    } else {
      navigation.navigate("Employee", { selectedClient, selectedDesignation });
    }
  };

  return (
    <View style={styles.dropdownCointainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Attendance</Text>
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
              data={clients.filter((option) =>
                option.toLowerCase().includes(searchInputClient.toLowerCase())
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={1}
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
            data={designations.filter((option) =>
              option
                .toLowerCase()
                .includes(searchInputDesignation.toLowerCase())
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

export default DropDown;

const styles = StyleSheet.create({
  header: {
    marginTop:30,
    backgroundColor: "#184562",
    height:50,
    // padding: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    
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
