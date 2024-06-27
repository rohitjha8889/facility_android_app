import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { DataContext } from "../../Data/DataContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Employee = ({ route }) => {
  const { fetchEmployees, employees, allClient, addAttendance, fetchFilteredAttendance, attendanceData, IP_Address } = useContext(DataContext);

  const { selectedClient, selectedDesignation } = route.params;

  function filterDataByHospitalAndService(hospitalName, service) {
    return allClient.find(item => item.hospitalName === hospitalName && item.service === service);
  }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JS
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };


  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const dropdownRefs = useRef([]);
  const [cardData, setCardData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [permissionOT, setPermissionOT] = useState('');
  const [adminId, setAdminId] = useState('');
  const [loading, setLoading] = useState(true);
  const [productAddModal, setProductAddModal] = useState(false);
  const [hideOT, setHideOT] = useState(true)


  useEffect(() => {
    fetchEmployees(selectedClient, selectedDesignation)
      .then(() => setLoading(false)) // Set loading to false when fetching is complete
      .catch(error => console.error("Error fetching employees: ", error));
  }, [selectedClient, selectedDesignation]);


  useEffect(() => {
    if (!loading && employees.length > 0) {
      setCardData(employees.map(employee => ({ ...employee, isSaved: false })));
    }
  }, [loading, employees]);



  useEffect(() => {
    if (!loading) {
      fetchFilteredAttendance(formatDate(selectedDate));
      // console.log(formatDate(selectedDate));
    }
  }, [loading, selectedDate]);




  useEffect(() => {
    const fetchPermission = filterDataByHospitalAndService(selectedClient, selectedDesignation);
    setPermissionOT(fetchPermission.overtimePermission);
  }, [selectedClient, selectedDesignation]);



  const handleBack = () => {
    navigation.navigate("Organization");
  };

  const AddStaff = () => {
    navigation.navigate("AddStaff", { selectedClient, selectedDesignation });
  };

  const getEmployeeData = async () => {
    try {
      const employeeData = await AsyncStorage.getItem('employeeData');
      if (employeeData) {
        const parsedData = JSON.parse(employeeData);
        setAdminId(parsedData._id);
      } else {
        console.log('No data in async');
      }
    } catch (err) {
      console.log("Getting error in retrieving data", err);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);




  const updateSelectedItem = (cardId, item) => {
    const updatedCardData = cardData.map((card) =>
      card._id === cardId ? { ...card, selectedItem: item, isSaved: false } : card
    );
    setCardData(updatedCardData);
  };

  const updateSelectedItemValue = (cardId, value) => {
    const updatedCardData = cardData.map((card) =>
      card._id === cardId ? { ...card, selectedItemValue: value, isSaved: false } : card
    );
    setCardData(updatedCardData);
  };

  const filteredCardData = cardData.filter((card) =>
    card.employeeName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleAttendance = (employeeId) => {
    // console.log(id)
    navigation.navigate("AttendanceDetails", { employeeId });
  };

  useEffect(() => {

    const updatedCardData = cardData.map((card) => {
      const attendanceRecord = attendanceData && attendanceData.find((record) => record.employeeId === card._id && formatDate(selectedDate) === record.checkInTime);
      if (attendanceRecord) {
        return {
          ...card,
          selectedItem: { title: attendanceRecord.attendanceStatus },
          selectedItemValue: attendanceRecord.overTime || '',
          isSaved: true,
        };
      } else {
        // If attendanceData is undefined or there is no attendance record for the selected date, clear the attendance status
        return {
          ...card,
          selectedItem: null,
          selectedItemValue: '',
          isSaved: false,
        };
      }
    });
    setCardData(updatedCardData);
  }, [attendanceData, selectedDate]);



  const handleSave = (cardId) => {
    const card = cardData.find((card) => card._id === cardId);

    // Check if selectedItem is null or undefined
    if (!card.selectedItem || !card.selectedItem.title) {
      Alert.alert('Please select an attendance value', 'Attendance value must be selected before saving.');
      return;
    }

    const data = {
      employeeId: cardId,
      attendanceStatus: card.selectedItem.title,
      overTime: card.selectedItemValue || '',
      checkInTime: formatDate(selectedDate),
      madeBy: adminId,
    };

    setProductAddModal(true);

    // console.log(data);
    addAttendance(data);

    setTimeout(() => {
      setProductAddModal(false);
    }, 900);

    const updatedCardData = cardData.map((card) =>
      card._id === cardId ? { ...card, isSaved: true } : card
    );

    const dropdownRef = dropdownRefs.current[cardId];
    if (dropdownRef) {
      dropdownRef.reset();
    }
    setCardData(updatedCardData);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const closeAddToCartModel = () => {
    setProductAddModal(false)
  }


  return (
    <View style={styles.container}>

{loading ? (
        <ActivityIndicator size="large" color="#184562" style={{ marginTop: 20, flex:1, justifyContent:'center', alignItems:'center' }} />
      ) : (
        <>
      <View style={styles.header}>
        <View style={styles.mainheader}>
          <TouchableOpacity onPress={handleBack}>
            <FontAwesome name="chevron-left" size={18} style={styles.menuIcon} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>{selectedDesignation}</Text>
            <Text style={styles.headerTextItem}>{selectedClient}</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
          value={searchInput}
          onChangeText={setSearchInput}
        />
      </View>

      <TouchableOpacity
        style={styles.addClientButton}
        onPress={AddStaff}
        activeOpacity={1}
      >
        <Ionicons name="person-add-outline" size={20} color="#fff" />
        <Text style={styles.addClientText}> Add Staff</Text>
      </TouchableOpacity>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>
            {formatDate(selectedDate)}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            maximumDate={new Date()}
            minimumDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            onChange={handleDateChange}
          />
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.allCard}>
          {filteredCardData.map((card) => {

            const profileImage = `${IP_Address}/profileImage/${card.profileImage}`
            const defaultImageUrl = `${IP_Address}/profileImage/dummy.jpg`
            return(
            
            <View
              style={[
                styles.allCardItem
              ]}
              key={card._id}
            >
              <TouchableOpacity style={[styles.card,
              card.isSaved ? styles.savedCardItem : null,]} onPress={() => handleAttendance(card._id)} activeOpacity={1}>
                <View style={styles.cardItems}>
                  <Image
                    style={styles.profileImage}
                    source={card.profileImage && card.profileImage.trim() !== '' ? { uri: profileImage } : { uri: defaultImageUrl }}
                  />
                  <Text style={styles.cardText}>{card.employeeName}</Text>
                </View>
                <Text style={styles.ViewDetails}>
                  View
                </Text>
              </TouchableOpacity>
              <View style={styles.attendanceDropDown}>
                <View style={styles.attendanceDropDown}>
                  <View style={styles.attendance}>
                    <SelectDropdown
                      ref={(ref) => (dropdownRefs.current[card._id] = ref)}
                      data={[
                        { title: "P/2" },
                        { title: "P" },
                        { title: "A" },
                        { title: "P+P/2" },
                        { title: "PP" },
                        { title: "PP+P/2" },
                        { title: "PPP" },
                        { title: "T" },
                      ]}
                      defaultButtonText={card.selectedItem?.title || "Select"}
                      onSelect={(item) => updateSelectedItem(card._id, item)}
                      renderButton={(selectedItem, isOpened) => (
                        <View style={styles.dropdownButton}>
                          <Text style={styles.dropdownButtonText}>
                            {(selectedItem && selectedItem.title) || card.selectedItem?.title || "Select"}
                          </Text>
                          <FontAwesome
                            name={isOpened ? "chevron-up" : "chevron-down"}
                            style={styles.dropdownButtonArrow}
                          />
                        </View>
                      )}
                      renderItem={(item, _index, isSelected) => (
                        <View
                          style={[
                            styles.dropdownItem,
                            isSelected && styles.selectedItem,
                          ]}
                        >
                          <Text style={styles.dropdownItemText}>
                            {item.title}
                          </Text>
                        </View>
                      )}
                      showsVerticalScrollIndicator={false}
                      dropdownStyle={styles.dropdownMenu}
                    />
                    {(permissionOT !== 'NO' && card.selectedItem?.title !== 'T' && card.selectedItem?.title !== 'A') && (
                      <TextInput
                        style={styles.AttendanceInput}
                        placeholder="OT"
                        keyboardType="numeric"
                        value={(card.selectedItemValue !== null && card.selectedItemValue !== undefined) ? `${card.selectedItemValue}` : ''}
                        onChangeText={(text) => updateSelectedItemValue(card._id, text)}
                      />
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    // card.isSaved ? styles.disabledSaveButton : null,
                  ]}
                  onPress={() => handleSave(card._id)}
                  disabled={card.isSaved}
                >
                  <Text style={styles.buttonText}>
                    {card.isSaved ? "Saved" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        )}
        </View>
      </ScrollView>


      <Modal
        transparent={true}
        visible={productAddModal}
        onRequestClose={closeAddToCartModel}
      >
        <TouchableWithoutFeedback >
          <View style={styles.modalAddToCartBackground}>
            <View style={styles.modalAddToCartContainer}>
              <AntDesign name='check' size={40} color='#fff' />
              <Text style={styles.cartAddedText}>Saved</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      </>
      )}
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
    padding: 10,
    height: 60,
    // marginTop: 25,
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
    padding: 5,
    borderRadius: 10,
    alignSelf: "center",
  },
  mainheader: {
    flexDirection: "row",
    alignItems: "center",
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
  addClientButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#184562",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
  },
  addClientText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  datePickerContainer: {
    marginTop: 5,
    margin: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  datePickerButton: {
    backgroundColor: '#00456e',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  datePickerButtonText: {
    color: '#fff'
  },
  allCard: {
    marginBottom: 100,
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
    backgroundColor: "#fff", // Default background color
  },
  savedCardItem: {
    backgroundColor: "#e0ffe0", // Green background color for saved items
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
  attendanceDropDown: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 75,
    // borderWidth:1,
    paddingHorizontal:10,
    paddingVertical:2,
    borderColor: "#184562",
  },
  buttonText: {
    color: "#184562",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },



  // Cart Modal
  modalAddToCartBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalAddToCartContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 20,
    // borderTopRightRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200
  },
  cartAddedText: {
    color: '#fff'
  },
});
