import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

const Employee = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [cardData, setCardData] = useState([
    {
      id: 1,
      name: "sanny ranjan singh",
      selectedItem: null,
      selectedItemValue: "",
    },
    {
      id: 2,
      name: "Rohit kumar jha",
      selectedItem: null,
      selectedItemValue: "",
    },
    { id: 3, name: "siwam kumar", selectedItem: null, selectedItemValue: "" },
    { id: 4, name: "Nitish kumar", selectedItem: null, selectedItemValue: "" },
    { id: 5, name: "rahul kumar", selectedItem: null, selectedItemValue: "" },
    { id: 6, name: "Sanny Ranjan", selectedItem: null, selectedItemValue: "" },
    // Add more names here if needed
  ]);
  const dropdownRefs = useRef([]);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      setCurrentDate(formattedDate);

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBack = () => {
    navigation.navigate("dropDown");
  };

  const AddClient = () => {
    navigation.navigate("AddClient");
  };

  const handleSave = (cardId) => {
    const updatedCardData = cardData.map((card) => {
      if (card.id === cardId) {
        if (!card.selectedItem) {
          Alert.alert("Error", "Please select an item from the dropdown.");
          return card; // Return the original card if no item is selected
        } else {
          Alert.alert(
            "Data Saved",
            `Attendance: ${
              card.selectedItem ? card.selectedItem.title : "None"
            }, OverTime: ${card.selectedItemValue} hrs`
          );
          // Reset the selectedItem and selectedItemValue after saving
          return {
            ...card,
            selectedItem: null,
            selectedItemValue: "",
          };
        }
      } else {
        return card; // Return other cards unchanged
      }
    });
    setCardData(updatedCardData);

    // Reset the dropdown state after saving
    if (dropdownRefs.current[cardId]) {
      dropdownRefs.current[cardId].reset();
    }
  };

  const updateSelectedItem = (cardId, item) => {
    const updatedCardData = cardData.map((card) =>
      card.id === cardId ? { ...card, selectedItem: item } : card
    );
    setCardData(updatedCardData);
  };

  const updateSelectedItemValue = (cardId, value) => {
    const updatedCardData = cardData.map((card) =>
      card.id === cardId ? { ...card, selectedItemValue: value } : card
    );
    setCardData(updatedCardData);
  };

  const filteredCardData = cardData.filter((card) =>
    card.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleAttendance = () => {
    navigation.navigate("AttendanceDetails");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.mainheader}>
          <TouchableOpacity activeOpacity={1} style={styles.bottomBarButton}>
            <FontAwesome
              name="chevron-left"
              size={18}
              style={styles.menuIcon}
              onPress={handleBack}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>GDA</Text>
            <Text style={styles.headerTextItem}>New Hopital</Text>
          </View>
        </View>
        <TouchableOpacity onPress={AddClient} activeOpacity={1}>
          <Text style={styles.addclient}>Add Employee</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
          value={searchInput}
          onChangeText={setSearchInput}
        />
      </View>

      <View style={styles.date}>
        <Text style={styles.text}>DATE: {currentDate}</Text>
        <Text style={styles.text}>TIME: {currentTime}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCardData.map((card) => (
          <View style={styles.allCardItem} key={card.id}>
            <View style={styles.card}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.cardItems}
                onPress={handleAttendance}
              >
                <Image
                  style={styles.profileImage}
                  source={require("../images/profileImages.png")}
                />
                <Text style={styles.cardText}>{card.name}</Text>
              </TouchableOpacity>
              <Text style={styles.ViewDetails} onPress={handleAttendance}>
                View
              </Text>
            </View>

            <View style={styles.attandanceDropDown}>
              <View style={styles.attendance}>
                <SelectDropdown
                  ref={(ref) => (dropdownRefs.current[card.id] = ref)}
                  data={[
                    { title: "P/2" },
                    { title: "P" },
                    { title: "A" },
                    { title: "P+P/2" },
                    { title: "PP" },
                    { title: "PP+P/2" },
                    { title: "PPP" },
                  ]}
                  onSelect={(item) => updateSelectedItem(card.id, item)}
                  renderButton={(selectedItem, isOpened) => (
                    <View style={styles.dropdownButton}>
                      <Text style={styles.dropdownButtonText}>
                        {(selectedItem && selectedItem.title) || "Select"}
                      </Text>
                      <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrow}
                      />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => (
                    <View
                      style={[
                        styles.dropdownItem,
                        isSelected && styles.selectedItem,
                      ]}
                    >
                      <Text style={styles.dropdownItemText}>{item.title}</Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenu}
                />
                <TextInput
                  style={styles.AttendanceInput}
                  placeholder="OT"
                  keyboardType="numeric"
                  value={card.selectedItemValue}
                  onChangeText={(text) =>
                    updateSelectedItemValue(card.id, text)
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSave(card.id)}
              >
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#184562",
    padding: 18,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  headerTextItem: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuIcon: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  addclient: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  mainheader: {
    flexDirection: "row",
    gap: 10,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#184562",
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  date: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 30,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "red",
    fontWeight: "800",
  },
  scrollContent: {
    flexGrow: 1,
  },
  allCardItem: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#184562",
    borderRadius: 10,
    padding: 5,
  },
  cardItems: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 10,
    flexWrap: "wrap",
  },
  card: {
    width: "50%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  cardText: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 10,
  },
  ViewDetails: {
    width: 40,
    height: 20,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 10,
    position: "absolute",
    right: 10,
    backgroundColor: "#007500",
    color: "#fff",
    fontWeight: "bold",
  },
  attendance: {
    flexDirection: "row",
    width: 80,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#184562",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    width: 80, // Fixed width
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 5,
  },
  dropdownButtonArrow: {
    fontSize: 10,
    color: "#184562",
  },
  dropdownItem: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    width: 120, // Match the width of the dropdown button
    borderWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    marginTop: 10,
  },
  AttendanceInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#184562",
    paddingHorizontal: 15,
    width: 60,
  },
  button: {
    marginTop: 30,
    borderColor: "#184562",
    marginLeft: 50,
  },
  buttonText: {
    color: "#184562",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
