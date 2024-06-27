import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import { DataContext } from "../Data/DataContext";

const CheckList = () => {
  const navigation = useNavigation();
  const { IP_Address } = useContext(DataContext);

  const handleBack = () => {
    navigation.goBack();
  };

  const checkLists = [
    { name: "Washroom", url: `${IP_Address}/checklistpdf/washroom.pdf` },
    { name: "Periodic Work", url: `${IP_Address}/checklistpdf/periodicwork.pdf` },
    { name: "Attendance", url: `${IP_Address}/checklistpdf/attendance.pdf` },
    { name: "Briefing", url: `${IP_Address}/checklistpdf/briefing.pdf` },
    { name: "Grooming", url: `${IP_Address}/checklistpdf/grooming.pdf` },
    { name: "Daily Observation", url: `${IP_Address}/checklistpdf/dailyobservation.pdf` },
    { name: "Room Inspection", url: `${IP_Address}/checklistpdf/roominspection.pdf` },
    { name: "Extra Work", url: `${IP_Address}/checklistpdf/extrawork.pdf` },
    { name: "GDA", url: `${IP_Address}/checklistpdf/gda.pdf` },
    { name: "Night Work", url: `${IP_Address}/checklistpdf/nightwork.pdf` },
    { name: "Organization Feedback", url: `${IP_Address}/checklistpdf/organizationfeedback.pdf` },
    { name: "Trainning", url: `${IP_Address}/checklistpdf/organizationfeedback.pdf` },
  ];

  const handleViewList = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Couldn't load page", err)
      );
    } else {
      Alert.alert("No URL available for this checklist");
    }
  };

  const handleDownload = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Couldn't load page", err)
      );
      Alert.alert(`Downloading ${url}...`);
    } else {
      Alert.alert("No URL available for this checklist");
    }
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
        <Text style={styles.headerText}>CheckList</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.checklist}>
          {checkLists.map((list, index) => (
            <View key={index} style={styles.checklistContent}>
              <Text style={styles.listName}>{list.name}</Text>
              <View style={styles.listView}>
                <TouchableOpacity onPress={() => handleViewList(list.url)}>
                  <Text style={styles.viewList}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDownload(list.url)}
                  style={styles.download}
                >
                  <Entypo
                    name="download"
                    size={20}
                    style={styles.downloadIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckList;

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
    gap: 10,
  },
  backIcon: {
    color: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  checklistContent: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#e2edf7",
  },
  checklist: {
    padding: 10,
  },
  listName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#184562",
  },
  listView: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  viewList: {
    fontSize: 15,
    fontWeight: "800",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#007500",
  },
  download: {
    backgroundColor: "#f5c6cb",
    padding: 5,
    borderRadius: 5,
  },
  downloadIcon: {
    color: "#721c24",
  },
});
