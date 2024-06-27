import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Zocial from "react-native-vector-icons/Zocial";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Complaint = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRaiseComplaint = () => {
    navigation.navigate("RaiseComplaint");
  };

  const handleComplaintHistory = () => {
    navigation.navigate("ComplaintHistory");
  };

  const handleComplaintStatus = () => {
    navigation.navigate("ComplaintStatus");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={20}
          style={styles.backIcon}
          onPress={handleBack}
        />
        <Text style={styles.headerText}>Complaint</Text>
      </View>

      <View style={styles.complaintCardContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={handleComplaintStatus}
        >
          <Zocial name="statusnet" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={handleComplaintHistory}
        >
          <FontAwesome name="history" size={40} style={styles.icon} />
          <Text style={styles.cardText}>History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.warningMessageContainer}>
        <Text style={styles.warningMessageText}>
          1. अनावश्यक शिकायत किए जाने पर आपके ऊपर उचित कार्रवाई की जा सकती है।
        </Text>
        <Text style={styles.warningMessageText}>
          2. आपकी शिकायत गुप्त रखी जाएगी एवं उच्च अधिकारी द्वारा जांच की जाएगी |
        </Text>
      </View>

      <TouchableOpacity
        style={styles.raiseComplaintButton}
        onPress={handleRaiseComplaint}
      >
        <MaterialIcons name="add" size={20} style={styles.addIcon} />
        <Text style={styles.buttonText}>Raise Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Complaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8daff",
  },
  header: {
    backgroundColor: "#184562",
    // marginTop: 30,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    // height:60
  },

  backIcon: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    // flex: 1,
  },
  complaintCardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  card: {
    width: "45%",
    height: 100,
    backgroundColor: "#184562",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "white",
    marginBottom: 10,
  },
  cardText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  raiseComplaintButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#184562",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  addIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  warningMessageContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  warningMessageText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#a83432",
    marginTop: 10,
  },
});
