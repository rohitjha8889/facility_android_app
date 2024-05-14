import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const AttendanceDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    if (selectedDate === undefined) return; // Cancel button pressed
    setSelectedDate(selectedDate);
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("Employee");
  };

  const renderDates = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => (
      <View style={styles.date} key={index + 1}>
        <Text>{index + 1}</Text>
        <View style={styles.circle}>
          <Text style={styles.text}>P</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesome name="chevron-left" size={18} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.text1}>Sanny Ranjan Singh</Text>
          <Text style={styles.text2}>{`${selectedDate.toLocaleString(
            "default",
            { month: "long" }
          )} ${selectedDate.getFullYear()}`}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={openDatePicker} style={styles.showMonthYear}>
          <Text style={styles.selectMonth}>SELECT MONTH</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={onDateChange}
          />
        )}
      </View>

      <ScrollView>
        <View style={styles.allDate}>{renderDates()}</View>

        <View style={styles.totalAttendance}>
          <Text style={styles.showAttendance}>Show Total Attendance</Text>
          <Text style={styles.attendanceText}>Total present= 20</Text>
          <Text style={styles.attendanceText}>Total Absent= 2</Text>
          <Text style={styles.attendanceText}>Total Double Duty= 4</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceDetails;

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
  },
  headerText: {
    marginLeft: 10,
  },
  text1: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  text2: {
    color: "#fff",
    fontSize: 16,
  },
  menuIcon: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    alignSelf: "center",
  },
  allDate: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    alignItems: "center",
    marginBottom: 10,
  },
  showMonthYear: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    width: 200,
    alignSelf: "center",
    marginTop: 10,
  },
  selectMonth: {
    color: "#184562",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalAttendance: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  showAttendance: {
    borderBottomWidth: 1,
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  attendanceText: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
});
