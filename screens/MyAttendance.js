import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { DataContext } from "../Data/DataContext";
import { useRoute } from '@react-navigation/native';

const MyAttendance = () => {

  const route = useRoute();
  // const { employeeId } = route.params;



  // const {userDetail} = useContext(DataContext)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [totalOt, setTotalOt] = useState(0)
  const [loading, setLoading] = useState(true);

  const { fetchAttendanceData, employeeAttendance, fetchEmployeeDetail, employeeDetail, fetchData, userDetail } = useContext(DataContext)

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack()
  };


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchAttendanceData(userDetail._id)
    fetchEmployeeDetail(userDetail._id)
  }, [userDetail._id])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Function to calculate attendance counts
    const calculateAttendanceCounts = () => {
      let presentCount = 0;
      let absentCount = 0;
      let otCount = 0;

      // Check if employeeAttendance is empty
      if (employeeAttendance.length === 0) {
        // If empty, set counts to 0 and return
        setTotalPresent(presentCount);
        setTotalAbsent(absentCount);
        setTotalOt(otCount);
        return;
      }

      // Extract year and month from selected date
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;

      let filteredAttendance = []

      if (employeeAttendance.length > 0) {

        // Filter attendance records for the selected month and year
        filteredAttendance = employeeAttendance.filter(attendance => {
          const [day, monthStr, yearStr] = attendance.checkInTime.split('.');
          const attendanceDate = new Date(`${yearStr}-${monthStr}-${day}`);
          return attendanceDate.getFullYear() === year && attendanceDate.getMonth() + 1 === month;
        });
      }

      // Calculate the number of days in the selected month
      const daysInMonth = new Date(year, month, 0).getDate();

      // Loop through each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        // Find attendance record for the current day
        const attendanceForDay = filteredAttendance.find(attendance => {
          const [dayStr, monthStr, yearStr] = attendance.checkInTime.split('.');
          const attendanceDate = new Date(`${yearStr}-${monthStr}-${dayStr}`);
          return attendanceDate.getDate() === day;
        });

        // If attendance record exists for the day, update counts based on attendance status
        if (attendanceForDay) {
          const status = attendanceForDay.attendanceStatus;
          if (status === 'P') {
            presentCount += 1;
          } else if (status === 'PP') {
            presentCount += 1;
            otCount += 1;
          } else if (status === 'PPP') {
            presentCount += 1;
            otCount += 2;
          } else if (status === 'A') {
            absentCount += 1;
          } else if (status === 'P/2') {
            presentCount += 0.5;
          } else if (status === 'P+P/2') {
            presentCount += 1;
            otCount += 0.5;
          } else if (status === 'PP+P/2') {
            presentCount += 1;
            otCount += 1.5;
          }
        }
      }

      // Update state with calculated counts
      setTotalPresent(presentCount);
      setTotalAbsent(absentCount);
      setTotalOt(otCount);
    };

    // Execute the calculation function
    calculateAttendanceCounts();
  }, [employeeAttendance, selectedDate]);






  const renderDates = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Month starts from 0, so add 1

    let filteredAttendance = [];
    if (employeeAttendance.length > 0) {
      // Filter attendance records for the selected month and year
      filteredAttendance = employeeAttendance.filter(attendance => {
        const [day, monthStr, yearStr] = attendance.checkInTime.split('.');
        const attendanceDate = new Date(`${yearStr}-${monthStr}-${day}`);
        return attendanceDate.getFullYear() === year && attendanceDate.getMonth() + 1 === month;
      });
    }

    // If employeeAttendance is empty or no attendance records for the selected month, show clean UI
    if (employeeAttendance.length === 0 || filteredAttendance.length === 0) {
      return (
        <View style={styles.cleanUIContainer}>
          <Text style={styles.cleanUIText}>No attendance data available</Text>
        </View>
      );
    }

    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Adjust month by -1 to get the correct index
    const daysInMonth = new Date(year, month, 0).getDate();

    const datesArray = [];
    let presentCount = 0;
    let absentCount = 0;
    let halfCount = 0;
    let otCount = 0;

    for (let i = 0; i < firstDayOfMonth; i++) {
      datesArray.push(
        <View style={styles.emptyDate} key={`empty-${i}`}>
          <Text style={styles.text}>_</Text>
        </View>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const attendanceForDay = filteredAttendance.find(attendance => {
        const [dayStr, monthStr, yearStr] = attendance.checkInTime.split('.');
        const attendanceDate = new Date(`${yearStr}-${monthStr}-${dayStr}`);
        return attendanceDate.getDate() === day;
      });

      let circleColor = '#ffffff';
      let borderStyle = 1
      // Default background color for the circle

      if (attendanceForDay) {
        const status = attendanceForDay.attendanceStatus;
        // Determine background color based on attendance status
        switch (status) {
          case 'P':
          case 'P/2':
            circleColor = '#008000'; // Green
            borderStyle = 0
            break;
          case 'A':
            circleColor = '#af0c0c'; // Red
            borderStyle = 0
            break;
          case 'PP':
          case 'PP+P/2':
          case 'PPP':
            circleColor = '#c47d01'; // Orange
            borderStyle = 0
            break;
          default:
            circleColor = '#ffffff'; // White for other cases
            borderStyle = 1
            break;
        }

        // Update counts based on status
        if (status === 'P') {
          presentCount += 1;
        } else if (status === 'PP') {
          presentCount += 1;
          otCount += 1;
        } else if (status === 'PPP') {
          presentCount += 1;
          otCount += 2;
        } else if (status === 'A') {
          absentCount += 1;
        } else if (status === 'P/2') {
          presentCount += 0.5;
        } else if (status === 'P+P/2') {
          presentCount += 1;
          otCount += 0.5;
        } else if (status === 'PP+P/2') {
          presentCount += 1;
          otCount += 1.5;
        }
      }

      datesArray.push(
        <View style={styles.date} key={day}>
          <Text style={{ textAlign: 'center' }}>{day}</Text>
          <View style={[styles.circle, { backgroundColor: circleColor, borderWidth: borderStyle }]}>
            <Text style={styles.text}>{attendanceForDay ? attendanceForDay.attendanceStatus : ''}</Text>
          </View>
        </View>
      );
    }

    return datesArray;
  };
  const generateYears = () => {
    const years = [];
    for (let year = 2000; year <= new Date().getFullYear(); year++) {
      years.push(
        <Picker.Item key={year} label={year.toString()} value={year} />
      );
    }
    return years;
  };

  const handleOverlayPress = () => {
    setShowMonthDropdown(false);
  };

  const handleMonthYearSelect = () => {
    const updatedDate = new Date(
      selectedYear,
      selectedMonth,
      selectedDate.getDate()
    );
    setSelectedDate(updatedDate);
    setShowMonthDropdown(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#184562" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <FontAwesome
              name="chevron-left"
              size={18}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.text1}>{employeeDetail ? employeeDetail.employeeName : 'Loading...'}</Text>
          </View>
        </View>

        <View style={styles.topSection}>
          <TouchableOpacity
            onPress={() => setShowMonthDropdown(true)}
            style={styles.showMonthYear}
          >
            <View style={styles.selectMonth}>
              <FontAwesome name="calendar" size={18} style={styles.mainIcon} />
              <Text>
                {`${selectedDate.toLocaleString("default", {
                  month: "long",
                })} ${selectedDate.getFullYear()}`}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.download}>
            <Feather name="download-cloud" size={30} style={styles.downloadIcon} />
            <Text style={styles.downloadText}>Download report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.attendanceSummary}>
          <View style={[styles.summaryBox, { borderLeftColor: "#84d1a5" }]}>
            <Text style={styles.summaryText}>Present</Text>
            <Text style={styles.summaryNumber}>{totalPresent}</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: '#f9f5f4', borderLeftColor: "#af0c0c" }]}>
            <Text style={styles.summaryText}>Absent</Text>
            <Text style={styles.summaryNumber}>{totalAbsent}</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: "#Fbf8f1", borderLeftColor: "#c47d01" }]}>
            <Text style={styles.summaryText}>OT</Text>
            <Text style={styles.summaryNumber}>{totalOt}</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: "#Faf5fb", borderLeftColor: "#D875db" }]}>
            <Text style={styles.summaryText}>Total</Text>
            <Text style={styles.summaryNumber}>{totalPresent + totalOt}</Text>
          </View>
        </View>

        <Modal
          visible={showMonthDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowMonthDropdown(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownTitle}>Select Month and Year</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedMonth}
                  onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                  style={styles.picker}
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <Picker.Item key={index} label={month} value={index} />
                  ))}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={(itemValue) => setSelectedYear(itemValue)}
                  style={styles.picker}
                >
                  {generateYears()}
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleMonthYearSelect}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView>
          <View style={styles.allDate}>
            <View style={styles.weeks}>
              <Text style={[styles.weektext, styles.date]}>Sun</Text>
              <Text style={[styles.weektext, styles.date]}>Mon</Text>
              <Text style={[styles.weektext, styles.date]}>Tue</Text>
              <Text style={[styles.weektext, styles.date]}>Wed</Text>
              <Text style={[styles.weektext, styles.date]}>Thu</Text>
              <Text style={[styles.weektext, styles.date]}>Fri</Text>
              <Text style={[styles.weektext, styles.date]}>Sat</Text>
            </View>
            <View style={styles.renderDate}>{renderDates()}</View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
  allDate: {
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
  weeks: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 10,
  },
  weektext: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: 'center',
    color: "#184562"
  },
  circle: {
    minWidth: 35,
    height: 35,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    // backgroundColor: "#3ace78",
    justifyContent: "center",
    padding: 2,
    // marginLeft: 10,
  },
  text: {
    fontSize: 12,
    // fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },
  date: {
    alignItems: "center",
    // justifyContent:'center',
    marginBottom: 10,
    width: '14%', // Adjusted to align the dates in a grid
    // borderWidth:1
  },
  emptyDate: {
    width: '14%', // To align with the dates
    height: 40, // Match the height of date cells
  },
  renderDate: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  showMonthYear: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    width: 150,
    margin: 10,
  },
  selectMonth: {
    color: "#184562",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "600",
    fontSize: 12,
  },
  topSection: {
    backgroundColor: "#fffae7",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  download: {
    justifyContent: "center",
    alignItems: "center",
  },
  downloadIcon: {
    color: "#184562",
  },
  downloadText: {
    color: "#184562",
    fontWeight: "800",
  },
  attendanceSummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    marginHorizontal: 10
  },
  summaryBox: {
    alignItems: "center",
    backgroundColor: "#F5faf6",
    padding: 10,
    borderLeftWidth: 2,
    width: '28%'
  },
  summaryText: {
    fontSize: 16,
    color: "#00456e",
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#184562",
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    overflow: 'hidden',
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 100,
  },
  button: {
    backgroundColor: "#184562",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
