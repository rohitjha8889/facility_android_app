import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  Linking,
  Modal,
  ActivityIndicator
} from "react-native";


import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import NewSlider from "../components/NewSlider";


import { useNavigation, useIsFocused } from "@react-navigation/native";
import Slider from "../components/Slider";
import AttendanceStack from "./Attendance/Organization";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




import Organization from "./Attendance/Organization";
import Employee from "./Attendance/Employee";
import AttendanceDetails from "./Attendance/AttendanceDetails";
import AddStaff from "./Attendance/AddStaff";
import Complaint from "./complaints/Complaint";
import RaiseComplaint from "./complaints/RaiseComplaint"


import AsyncStorage from '@react-native-async-storage/async-storage';



import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from "../Data/DataContext";
import { ComplaintContext } from "../Data/complaintContext";
import MyAttendance from "./MyAttendance";
import CheckList from "./CheckList";
import ComplaintHistory from "./complaints/ComplaintHistory";
import ComplaintStatus from "./complaints/ComplaintStatus";
import Header from "../components/Header";

// import Salary from "./Salary";

const DashboardScreen = () => {
  // const [employeeName, setEmployeename] = useState('');
  const [employeeId, setEmployeeId] = useState()
  const [attendancePermission, setattendancePermission] = useState('')
  const [updateBox, setUpdateBox] = useState(false)
  // const [unifor]
  const [currentTime, setCurrentTime] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [loading, setLoading] = useState(true);
  const [backHandlerActive, setBackHandlerActive] = useState(false);

  const { fetchData, userDetail, IP_Address, slider, fetchLatestVersion } = useContext(DataContext)
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  const { fetchAllComplaints, allComplaints } = useContext(ComplaintContext)

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const handleBackButton = () => {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to exit the app?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  const openPlayStore = () => {
    const url = 'https://play.google.com/store/apps/details?id=com.metrolitehomeservices.metrolitefacility'; // Replace with your app's package name
    Linking.openURL(url).catch((err) => console.error('Error opening Play Store', err));
  };

  useEffect(() => {
    const fetchData = async () => {
      const latestVersion = await fetchLatestVersion();

      
      // console.log(latestVersion);
      const currentVersion = "1.0.4";
      // console.log(latestVersion, currentVersion)

      if (latestVersion !== currentVersion) {
        
          setUpdateBox(!updateBox);
        

      }
    };



    fetchData();


  }, []);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [isFocused]);

  // Rest of your component code



  const attendanceapp = () => {
    navigation.navigate(Organization);
  };
  const complaintapp = () => {
    navigation.navigate(Complaint);
  };

  const showMyAttendance = () => {
    navigation.navigate(MyAttendance)
  }

  const handleSalary = () => {
    navigation.navigate(Salary)
  }


  const handleCheckList = () => {
    navigation.navigate(CheckList)
  }

  const showJobPortal = () => {
    Linking.openURL("https://metrolitesolutions.com/join/auth/login.php");
  };

  useEffect(() => {
    // getEmployeeData();
    getCurrentTimeAndDate()
  }, [])

 

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(() => {
    if (userDetail) {
      setattendancePermission(userDetail.attendancePermission);
      setLoading(false);
    }
  }, [userDetail]);


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


  // const handleComplaintResolution = async (complaintId) => {
  //   try {
  //     const response = await fetch(`${IP_Address}/complaint/complaints/${complaintId}/approvedUser`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //          approvedUser: 'YES',
  //         resolveTime:`${currentDate}, ${currentTime}`
  //        }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update complaint status');
  //     }

  //     const updatedComplaint = await response.json();
  //     console.log(`Complaint with ID ${complaintId} resolved`, updatedComplaint);

  //     setFilteredComplaints((prevComplaints) => 
  //       prevComplaints.filter(complaint => complaint._id !== complaintId)
  //     );
  //   } catch (error) {
  //     console.error(`Error resolving complaint with ID ${complaintId}:`, error);
  //   }
  // };

 

  const showServiceUnavailableAlert = () => {
    Alert.alert(
      'Service Unavailable',
      'Sorry, the service is not available right now. Please stay tuned for updates.',
      [{ text: 'OK' }]
    );
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <Header/>

      <NewSlider mainSlider={slider} />

      {/* <Slider /> */}
      {/* All Main */}

      {loading ? (
        <ActivityIndicator size="large" color="#184562" style={{ marginTop: 20 }} />
      ) : (     
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {attendancePermission === 'YES' ? (

          <View style={styles.content}>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>


              <TouchableOpacity
                style={styles.imagecointainer}
                onPress={attendanceapp}
              >
                <FontAwesome name="calendar" size={30} style={styles.mainIcon} />
                <Text style={styles.text}> Create Attendance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.imagecointainer, { marginRight: 0 }]}
                onPress={showMyAttendance}
              >
                <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
                <Text style={styles.text}>View Attendance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imagecointainer}
                onPress={complaintapp}
              >
                <MaterialIcons name="report-problem" size={30} style={styles.mainIcon} />
                <Text style={styles.text}>Complaint</Text>
              </TouchableOpacity>


            </View>

            <TouchableOpacity
              style={styles.imagecointainer}
              onPress={handleCheckList}
            >
              <Octicons name="checklist" size={30} style={styles.mainIcon} />
              <Text style={styles.text}>CheckList</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.imagecointainer, { marginLeft: 15 }]}
              onPress={showJobPortal}
            >
              <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
              <Text style={styles.text}>Joining</Text>
            </TouchableOpacity>

          </View>
        ) : (
          <View style={styles.content}>
            <View style={{ width: '100%', flexDirection: 'row'}}>
              
            <TouchableOpacity
                style={[styles.imagecointainer, { marginLeft: 15 }]}
                onPress={complaintapp}
              >
                <MaterialIcons name="report-problem" size={30} style={styles.mainIcon} />
                <Text style={styles.text}>Complaint</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.imagecointainer]}
                onPress={showMyAttendance}
              >
                <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
                <Text style={styles.text}>View Attendance</Text>
              </TouchableOpacity>

              

              {/* <TouchableOpacity
                style={styles.imagecointainer}
                onPress={handleCheckList}
              >
                <Octicons name="checklist" size={30} style={styles.mainIcon} />
                <Text style={styles.text}>CheckList</Text>
              </TouchableOpacity> */}

            </View>

            {/* <TouchableOpacity
              style={styles.imagecointainer}
              onPress={showJobPortal}
            >
              <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
              <Text style={styles.text}>Joining</Text>
            </TouchableOpacity> */}
          </View>
        )
        }


<Modal
        animationType="slide"
        transparent={true}
        visible={updateBox}
        // onRequestClose={() => {
        //   setUpdateBox(!updateBox);
        // }}
      >
       <View style={styles.updateModal}>
              <View style={styles.updateModalMain}>
                <View style={styles.updateModalContent}>
                  <Text style={styles.updateTitle}>Update Metrolite?</Text>
                  <Text style={styles.updateDescription}>
                    Metrolite recommends that you update to the latest version. You can keep using this app after installing the update.
                  </Text>

                  <View style={styles.updateButtonBox}>
                  <Image source={require('../images/googleplay.png')} style={styles.googlePlayImage} />
                    <TouchableOpacity
                      style={styles.updateButton}
                     onPress={openPlayStore}
                    >
                      <Text style={styles.updateButtonText}>UPDATE</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.bottomRow}>
                    
                  </View>
                </View>
              </View>
            </View>
      </Modal>

      </ScrollView>
      )}
    </View>
  );
};

const Stack = createStackNavigator()

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardHome"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />

    {/* Attendance */}
    <Stack.Screen
      name="Organization"
      component={Organization}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Employee"
      component={Employee}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CheckList"
      component={CheckList}
      options={{ headerShown: false }}
    />



    <Stack.Screen
      name="AttendanceDetails"
      component={AttendanceDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MyAttendance"
      component={MyAttendance}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="AddStaff"
      component={AddStaff}
      options={{ headerShown: false }}
    />


    {/* Complaint */}
    <Stack.Screen
      name="Complaint"
      component={Complaint}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RaiseComplaint"
      component={RaiseComplaint}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ComplaintHistory"
      component={ComplaintHistory}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ComplaintStatus"
      component={ComplaintStatus}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);


export default DashboardStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#FFF",
    // marginTop: 25,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    height: 60,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title1: {
    fontSize: 18,
    color: "#184562",
  },
  searchIcon: {
    color: "#184562",
  },
  mainIcon: {
    color: "#fff",
  },
  content: {
    padding: 10,
    flexDirection: "row",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    width: "95%",
    margin: 20,
  },
  imagecointainer: {
    width: "30%",
    height: 100,
    backgroundColor: "#184562",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: 'center'
  },

  // Update Modal

  updateModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  updateModalContent: {
    marginTop: 50,
    backgroundColor: 'black',
    width: '98%',

    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  updateDescription: {
    color: 'white',
    marginBottom: 16,
  },

  updateButtonBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    // borderWidth:1,
    borderColor: 'red'
  },

  updateButton: {
    backgroundColor: '#007500',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderRadius: 8,
    alignItems: 'center',
    // width:'40%'
  },
  updateButtonText: {
    color: 'white',
  },
  updateNoThanks: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
  updateBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },

  googlePlayImage: {
    width: 150,
    height: 80
  }
});
