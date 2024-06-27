import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../../Data/DataContext";
import { ComplaintContext } from "../../Data/complaintContext";

const ComplaintHistory = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const { userDetail, IP_Address } = useContext(DataContext);
  const { fetchAllComplaints, allComplaints } = useContext(ComplaintContext);

  useEffect(() => {
    fetchAllComplaints(userDetail._id);
  }, [userDetail]);

  useEffect(() => {
    // console.log(allComplaints);
  }, [allComplaints]);

  const handleBack = () => {
    navigation.navigate("Complaint");
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedComplaint(null);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={20}
          style={styles.backIcon}
          onPress={handleBack}
        />
        <Text style={styles.headerText}>Complaint Details</Text>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {allComplaints.map((complaint, index) => {
          const id = complaint._id.slice(-5);
          const date = complaint.complaintTime.split(",")[0];

          return (
            <View style={styles.complaintDetail} key={index}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Complaint No:</Text>
                <Text style={styles.value}>#{id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Complaint Category:</Text>
                <Text style={styles.value}>{complaint.complainType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Complaint Date:</Text>
                <Text style={styles.value}>{date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Complaint Status:</Text>
                <Text style={styles.value}>{complaint.status}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewDetails}
                onPress={() => openModal(complaint)}
              >
                <Text style={styles.viewText}>View Details</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {selectedComplaint && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.modalTitle}>Complaint Details</Text>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Complaint ID:</Text>
                  <Text style={styles.modalValue}>
                    #{selectedComplaint._id.slice(-5)}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Complaint Type:</Text>
                  <Text style={styles.modalValue}>
                    {selectedComplaint.complainType}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Complaint Date:</Text>
                  <Text style={styles.modalValue}>
                    {selectedComplaint.complaintTime.split(",")[0]}
                  </Text>
                </View>
                <Text style={styles.modalLabel}>Complaint Details:</Text>
                <Text style={styles.modalText}>
                  {selectedComplaint.complaint}
                </Text>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Resolve Date:</Text>
                  <Text style={styles.modalValue}>
                    {selectedComplaint.resolveDate}
                  </Text>
                </View>
                {selectedComplaint.complaintImage && (
                  <Image
                    source={{ uri: `${IP_Address}/complaintImages/${selectedComplaint.complaintImage}`}}
                    style={styles.modalImage}
                  />
                )}
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Entypo name="cross" size={40} style={styles.closeIcon} />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ComplaintHistory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F0F4F7",
  },
  header: {
    backgroundColor: "#184562",
    // marginTop: 30,
    padding: 15,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  complaintDetail: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "600",
    color: "#184562",
    fontSize: 16,
  },
  value: {
    color: "#555",
    fontSize: 16,
    textAlign: "right",
    marginLeft: 10,
  },
  viewDetails: {
    alignSelf: "flex-end",
  },
  viewText: {
    color: "#007500",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    maxHeight: "70%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#184562",
    borderBottomWidth: 1,
    borderColor: "#FF5733",
    paddingBottom: 10,
    textAlign: "center",
  },
  modalRow: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: 5,
  },
  modalLabel: {
    fontSize: 16,
    color: "#184562",
    fontWeight: "600",
  },
  modalValue: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
    flex: 1,
  },
  modalText: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  modalImage: {
    height: 200,
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  closeIcon: {
    color: "red",
  },
});
