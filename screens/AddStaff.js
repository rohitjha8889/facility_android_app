import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { DataContext } from "../Data/DataContext";

const AddStaff = ({ route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [selectedSite, setSelectedSite] = useState("Select site");
  // const [selectedDesignation, setSelectedDesignation] =
  //   useState("Select Designation");

  const navigation = useNavigation();
  const { IP_Address, handleSaveEmployee } = useContext(DataContext)
  const { selectedClient, selectedDesignation } = route.params;

  useEffect(() => {
    console.log(selectedClient, selectedDesignation)
  }, [selectedClient, selectedDesignation])


  const handleSave = async () => {
    try {
      // Validate image
      if (!profileImage) {
        Alert.alert("Error", "Please upload an image.");
        return;
      }
  
      // Validate name and phone
      if (!name.trim() || !phone.trim()) {
        Alert.alert("Error", "Name and phone number are required.");
        return;
      }
  
      // Validate phone number length
      if (phone.length !== 10) {
        Alert.alert("Error", "Please enter a 10-digit phone number.");
        return;
      }
  
      // Create form data
      const formData = new FormData();
      formData.append("profileImage", {
        uri: profileImage,
        type: "image/jpeg",
        name: "profileImage.jpg",
      });
      formData.append("employeeName", name);
      formData.append("employeePhone", phone);
      formData.append("hospitalName", selectedClient);
      formData.append("service", selectedDesignation);
  
      // Send data to the API endpoint
      handleSaveEmployee(formData);
  
      // Reset form fields
      setName("");
      setPhone("");
     
      setProfileImage(null);
  
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Request camera permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  // Open camera
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Save the employee data


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="chevron-left" size={18} style={styles.menuIcon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Attendance</Text>
        </View>
      </View>

      {/* Camera View */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cameraView}>
          {profileImage ? (
            <Image style={styles.cameraImage} source={{ uri: profileImage }} />
          ) : (
            <Image
              style={styles.cameraImage}
              source={require("../images/noImage.png")}
            />
          )}
        </View>

        <View style={styles.formContainer}>
          <View style={styles.uploadImage}>
            <TouchableOpacity onPress={openCamera}>
              <Text style={styles.imageText}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Enter your name"
            onChangeText={setName}
          />

          <Text style={styles.label}>Phone no</Text>
          <TextInput
            style={styles.input}
            value={phone}
            placeholder="Enter your number"
            keyboardType="numeric"
            onChangeText={setPhone}
          />
          <Text style={styles.label}>Organation</Text>
          <TextInput
            style={[styles.input, { fontWeight: '700', color: '#000' }]}
            value={selectedClient}
            editable={false}
            onChangeText={setPhone}
          />
          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={[styles.input, { fontWeight: '700', color: '#000' }]}
            value={selectedDesignation}
            editable={false}
            onChangeText={setPhone}
          />

          {/* <View style={styles.allDropDown}>
            <Text style={styles.dropDownheading}>Select Organization</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSite}
                onValueChange={(itemValue) => setSelectedSite(itemValue)}
                style={styles.picker}
              >
                {[
                  "Select Organation",
                  "Alshifa",
                  "Arya",
                  "Ashok Hospital",
                  "DMK Office",
                  "Ford Hospital",
                  "IMT University",
                  "Jeewan Hospital",
                  "Kailash Hospital",
                  "KMC Hospital",
                ].map((siteName, index) => (
                  <Picker.Item key={index} label={siteName} value={index} />
                ))}
              </Picker>
            </View>
          </View> */}

          {/* <Text style={styles.dropDownheading}>Select Designation</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDesignation}
              onValueChange={(itemValue) => setSelectedDesignation(itemValue)}
              style={styles.picker}
            >
              {[
                "Select Degination",
                "Security Guard",
                "Housekeeping",
                "GDA",
                "Receptionist",
                "Security Supervisor",
                "HK/GDA Supervisor",
                "Gunman",
                "Site Incharge",
              ].map((selectedDesignation, index) => (
                <Picker.Item
                  key={index}
                  label={selectedDesignation}
                  value={index}
                />
              ))}
            </Picker>
          </View>
          */}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddStaff;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f0f0f0",
  },
  header: {
    gap: 20,
    flexDirection: "row",
    backgroundColor: "#184562",

    marginTop: 25,
    height: 70,
    padding: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
  },
  cameraView: {
    alignItems: "center",
    marginTop: 10,
  },

  cameraImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#184562",
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
    marginTop: 5,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },

  dropDownheading: {
    fontSize: 16,
    color: "#184562",
  },

  pickerContainer: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    marginTop: 5,
    backgroundColor: "#fff",
  },

  picker: {
    width: "100%",
  },

  uploadImage: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    marginTop: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  imageText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#184562",
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
});
