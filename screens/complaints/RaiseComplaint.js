import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { ComplaintContext } from "../../Data/complaintContext";
import { DataContext } from "../../Data/DataContext";

const RaiseComplaint = () => {
  const [complaint, setComplaint] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [image, setImage] = useState(null);
  
  const [currentTime, setCurrentTime] = useState();
  const [currentDate, setCurrentDate] = useState()


  const navigation = useNavigation();

  const { pass, addComplaint } = useContext(ComplaintContext);
  const {fetchData, userDetail} = useContext(DataContext)



  const getCurrentTimeAndDate = () => {
    const now = new Date();
  
    // Format time as HH:MM AM/PM
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  
    // Format date as DD.MM.YYYY
    const day = now.getDate();
    const month = now.getMonth() + 1; // getMonth() is zero-based
    const year = now.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    setCurrentTime(formattedTime);
    setCurrentDate(formattedDate)
  
    return { time: formattedTime, date: formattedDate };
  };

  useEffect(()=>{
    fetchData();
    getCurrentTimeAndDate()
  },[])

  useEffect(()=>{
    // console.log(userDetail)
  },[userDetail])

  const handleSaveComplaints = async () => {
    if (!complaint || !complaintText) {
      Alert.alert("Please fill all details");
    } else {
      // console.log("Complaint Type:", complaint);
      // console.log("Complaint Text:", complaintText);
      // console.log("Image URL:", image);

      const newComplaint = {
        employeeID: userDetail._id,  // Add the appropriate employee ID
        complaintType: complaint,
        complaintText,
        image: image ? { uri: image } : null,
        complaintTime: `${currentDate}, ${currentTime}`,
      };

      try {
        await addComplaint(newComplaint);
        Alert.alert("Register Complaint", "Complaint registered successfully!");

        setComplaint("");
        setComplaintText("");
        setImage(null);
        handleBack()


        
      } catch (error) {
        Alert.alert("Error", "There was an error registering your complaint. Please try again.");
      }
    }
  };

  useEffect(() => {
    // console.log(pass);
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = () => {
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const saveImage = () => {
    setSaveButtonPressed(true);
    Alert.alert("Image saved successfully!");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesome
            name="chevron-left"
            size={18}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.text1}>My Complaint</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.textHeader}>Please Select Complaint Type</Text>
            <SelectDropdown
              data={[
                { title: "Salary" },
                { title: "Attendance" },
                { title: "Miss Behave" },
                { title: "Payment Demand" },
                { title: "Job Firing" },
                { title: "Others" },
              ]}
              onSelect={(item) => setComplaint(item.title)}
              renderButton={(selectedItem, isOpened) => (
                <View style={styles.dropdownButton}>
                  <Text style={styles.dropdownButtonText}>
                    {selectedItem ? selectedItem.title : "Select Type"}
                  </Text>
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrow}
                  />
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View
                  style={[styles.dropdownItem, isSelected && styles.selectedItem]}
                >
                  <Text style={styles.dropdownItemText}>{item.title}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenu}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.textInput}>Write a Complaint</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={complaintText}
              onChangeText={setComplaintText}
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress={uploadImage} style={styles.attachFile}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}>
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={30}
                    style={styles.addPhoto}
                  />
                  <Text style={styles.text}>Upload Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.saveAllData}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSaveComplaints}
              >
                <Text style={styles.save}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RaiseComplaint;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    // marginTop: 25,
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
  contentContainer: {
    backgroundColor: "#88b6e7",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    borderWidth: 8,
    borderColor: "#e2edf7",
  },
  textHeader: {
    fontSize: 18,
    color: "#184562",
    marginBottom: 5,
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "800",
    color: "#184562",
    marginBottom: 5,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "100",
    color: "#184562",
    alignSelf: "center",
  },
  dropdownButton: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 0.5,
    backgroundColor: "#E9ECEF",
    borderColor: "#184562",
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#184562",
  },
  dropdownButtonArrow: {
    fontSize: 10,
  },
  dropdownMenu: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItem: {
    flex: 1,
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#151E26",
  },
  selectedItem: {
    backgroundColor: "#D4EDDA",
  },
  textArea: {
    borderColor: "#184562",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  attachFile: {
    borderColor: "#184562",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 5,
    height: 100,
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addPhoto: {
    marginRight: 10,
  },
  saveAllData: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#184562",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  save: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
