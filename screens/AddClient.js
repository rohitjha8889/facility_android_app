import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AddOrganization = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedClient, setSelectedClient] = useState("Select Client");
  const [selectedDesignation, setSelectedDesignation] = useState(
    "Select Designation"
  );
  const [isClientClicked, setIsClientClicked] = useState(false);
  const [isDesignationClicked, setIsDesignationClicked] = useState(false);
  const [image, setImage] = useState(null);
  const [searchInputClient, setSearchInputClient] = useState("");
  const [searchInputDesignation, setSearchInputDesignation] = useState("");

  const navigation = useNavigation();

  const backOnAttendance = () => {
    navigation.navigate("DropDown");
  };

  const handleSave = () => {
    if (
      !name ||
      !phone ||
      selectedClient === "Select Client" ||
      selectedDesignation === "Select Designation"
    ) {
      Alert.alert(
        "Please fill all fields and select organization/designation"
      );
    } else {
      Alert.alert(
        "Employee Added!",
        `Name: ${name}\nPhone: ${phone}\nClient: ${selectedClient}\nDesignation: ${selectedDesignation}\nImage URL: ${image}`
      );
      setName("");
      setPhone("");
      setSelectedClient("Select Client");
      setSelectedDesignation("Select Designation");
      setImage(null);
      navigation.navigate("DashboardScreen");
    }
  };

  const handleSelectClient = (item) => {
    setSelectedClient(item);
    setIsClientClicked(false);
  };

  const handleSelectDesignation = (item) => {
    setSelectedDesignation(item);
    setIsDesignationClicked(false);
  };

  const clients = [
    "Noida Hospital",
    "New Hospital",
    "Old Hospital",
    "Home Service",
    "Supervisor + Security",
    "Supervisor + GDA/HK",
  ];

  const designations = [
    "SG",
    "GDA",
    "HK",
    "Receptionist",
    "Supervisor + Security",
    "Supervisor + GDA/HK",
  ];

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const choice = await new Promise((resolve) =>
      Alert.alert(
        "Select Image Source",
        "Choose the image source",
        [
          {
            text: "Camera",
            onPress: () => resolve("camera"),
          },
          {
            text: "Gallery",
            onPress: () => resolve("gallery"),
          },
        ],
        { cancelable: true }
      )
    );

    let pickerResult;
    if (choice === "camera") {
      pickerResult = await ImagePicker.launchCameraAsync(options);
    } else if (choice === "gallery") {
      pickerResult = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      // console.log("Image URL:", pickerResult.uri);
      // Alert.alert("Image URL:" + pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="chevron-left"
          size={16}
          style={styles.backIcon}
          onPress={backOnAttendance}
        />
        <Text style={styles.textheader}>Attendance</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleImageUpload}
        >
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
            onError={(error) => console.error("Error loading image:", error)}
          />
        ) : null}

        <Text style={styles.label}>Phone no</Text>
        <TextInput
          style={styles.input}
          value={phone}
          placeholder="Enter your number"
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
        />

        <View style={styles.allDropDown}>
          <Text style={styles.dropDownheading}>Select Organization</Text>
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

        <Text style={styles.dropDownheading}>Select Designation</Text>
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
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddOrganization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#184562",
    padding: 20,
    paddingTop: 40,
    gap: 10,
  },
  backIcon: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
  },
  textheader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#184562",
  },
  input: {
    width: "100%",
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
    backgroundColor: "#fff",
  },
  dropdownSelector: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  allDropDown: {},
  icon: {
    width: 15,
    height: 15,
  },
  dropdownArea: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
    position: "absolute",
    top: 75,
    zIndex: 1,
  },
  dropdownArea1: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
    position: "absolute",
    top: 12,
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
  dropDownheading: {
    color: "#184562",
    fontWeight: "bold",
    marginTop: 5,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8e8e8e",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#184562",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  uploadButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  uploadButtonText: {
    color: "#184562",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
