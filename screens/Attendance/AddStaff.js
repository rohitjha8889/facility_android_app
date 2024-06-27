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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from "../../Data/DataContext";

const AddStaff = ({ route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();
  const { IP_Address, handleSaveEmployee, fetchEmployees } = useContext(DataContext);
  const { selectedClient, selectedDesignation } = route.params;

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleSave = async () => {
    try {
      // if (!profileImage) {
      //   Alert.alert("Error", "Please upload an image.");
      //   return;
      // }

      if (!name.trim() || !phone.trim()) {
        Alert.alert("Error", "Name and phone number are required.");
        return;
      }

      if (phone.length !== 10) {
        Alert.alert("Error", "Please enter a 10-digit phone number.");
        return;
      }

      // if (!birthday) {
      //   Alert.alert("Error", "Please select a valid birthday.");
      //   return;
      // }
      if (birthday) {
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthday.getFullYear();
      const monthDifference = currentDate.getMonth() - birthday.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthday.getDate())) {
        age--;
      }

      if (age < 18) {
        Alert.alert("Error", "Age must be at least 18 years.");
        return;
      }
    }
      const formData = new FormData();

      if (profileImage) {
      formData.append("profileImage", {
        uri: profileImage,
        type: "image/jpeg",
        name: "profileImage.jpg",
      });

    }
      formData.append("employeeName", name);
      formData.append("employeePhone", phone);
      formData.append("hospitalName", selectedClient);
      formData.append("service", selectedDesignation);
      formData.append("birthday", birthday ? formatDate(birthday) : '');

      handleSaveEmployee(formData);

      setName("");
      setPhone("");
      setProfileImage(null);
      setBirthday(null);


      await fetchEmployees(selectedClient, selectedDesignation);
      navigation.navigate("Employee", { selectedClient, selectedDesignation, refresh: true });      // navigation.goBack();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const showDatePickerDialog = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = new Date();
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      const monthDifference = currentDate.getMonth() - selectedDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (age < 18) {
        Alert.alert("Error", "Age must be at least 18 years.");
      } else {
        setBirthday(selectedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="chevron-left" size={18} style={styles.menuIcon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Add Staff</Text>
        </View>
      </View>

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
              source={require("../../images/noImage.png")}
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

          <Text style={styles.label}>Organization</Text>
          <TextInput
            style={[styles.input, { fontWeight: '700', color: '#000' }]}
            value={selectedClient}
            editable={false}
          />

          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={[styles.input, { fontWeight: '700', color: '#000' }]}
            value={selectedDesignation}
            editable={false}
          />

          <Text style={styles.label}>Birthday</Text>
          <TouchableOpacity onPress={showDatePickerDialog}>
            <TextInput
              style={styles.input}
              value={birthday ? formatDate(birthday) : ""}
              placeholder="Select your birthday"
              editable={false}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthday || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
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
    height: 50,
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
    textAlignVertical:'bottom',
    textDecorationLine:'underline',
    fontWeight:'800'
  },
});
