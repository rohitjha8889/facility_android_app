import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../../Data/DataContext";
import { ComplaintContext } from "../../Data/complaintContext";

const ComplaintStatus = () => {
  const navigation = useNavigation();

  const { userDetail, IP_Address } = useContext(DataContext);
  const { fetchAllComplaints, allComplaints } = useContext(ComplaintContext);
  const [currentTime, setCurrentTime] = useState();
  const [currentDate, setCurrentDate] = useState()


  useEffect(()=>{
    getCurrentTimeAndDate()
  },[])
  useEffect(() => {
    fetchAllComplaints(userDetail._id);
  }, [userDetail]);

  // useEffect(() => {
  //   console.log(allComplaints);
  // }, [allComplaints]);

  const handleBack = () => {
    navigation.navigate("Complaint");
  };




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

const handleComplaintResolution = async (complaintId) => {
    try {
      const response = await fetch(`${IP_Address}/complaint/complaints/${complaintId}/approvedUser`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           approvedUser: 'YES',
          resolveTime:`${currentDate}, ${currentTime}`
         }),
      });

      if (!response.ok) {
        throw new Error('Failed to update complaint status');
      }
      fetchAllComplaints(userDetail._id);
      // const updatedComplaint = await response.json();
      // console.log(`Complaint with ID ${complaintId} resolved`, updatedComplaint);

      // setFilteredComplaints((prevComplaints) => 
      //   prevComplaints.filter(complaint => complaint._id !== complaintId)
      // );
    } catch (error) {
      console.error(`Error resolving complaint with ID ${complaintId}:`, error);
    }
  };





  const handleYes = () => {
    Alert.alert("Complaint Closed", "Your complaint has been closed.", [
      { text: "OK", onPress: () => navigation.navigate("Complaint") },
    ]);
  };

  const handleNo = () => {
    Alert.alert("Action Cancelled", "Your complaint is still in process.");
  };

  // Filter complaints based on the conditions
  const filteredComplaints = allComplaints.filter(complaint => 
    complaint.status === "NOT SOLVED" || 
    (complaint.status === "RESOLVED" && complaint.approvedUser === "NO")
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={20}
          style={styles.backIcon}
          onPress={handleBack}
        />
        <Text style={styles.headerText}>Complaint Status</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {filteredComplaints.map((complaint, index) => (
          <View key={index} style={styles.complaintDetail}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Complaint ID:</Text>
              <Text style={styles.value}>#{complaint._id.slice(-5)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Complaint Category:</Text>
              <Text style={styles.value}>{complaint.complainType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Complaint Date:</Text>
              <Text style={styles.value}>{complaint.complaintTime.split(",")[0]}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{complaint.status}</Text>
            </View>
            <Text style={styles.complaintText}>Complaint Details:</Text>
            <Text style={styles.modalText}>{complaint.complaint}</Text>
            {complaint.complaintImage && (
            <Image
              source={{ uri: `${IP_Address}/complaintImages/${complaint.complaintImage}`}}
              style={styles.complaintImage}
            />
            )}

            {complaint.status == "RESOLVED" &&(
              <View style={styles.askUser}>
              <Text style={styles.askUserText}>
                Your Complaint Get resolved?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.yesButton} onPress={()=> handleComplaintResolution(complaint._id)}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.noButton} onPress={handleNo}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            )

            }
            
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ComplaintStatus;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#b8daff",
  },
  header: {
    backgroundColor: "#184562",
    // marginTop: 30,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  complaintDetail: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: "#e2edf7",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e2edf7",
  },
  label: {
    fontWeight: "600",
    color: "#184562",
    width: 150,
  },
  value: {
    flex: 1,
    color: "#555",
    textAlign: "right",
  },
  complaintText: {
    fontWeight: "600",
    color: "#184562",
    marginTop: 10,
  },
  modalText: {
    color: "#555",
    marginBottom: 20,
  },
  complaintImage: {
    height: 150,
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
  },
  askUser: {
    alignItems: "center",
  },
  askUserText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#184562",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  noButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
