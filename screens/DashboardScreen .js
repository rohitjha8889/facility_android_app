import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import Slider from "./Slider";
import { useState } from "react";

const Dashboard = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState("Home");

  const handleImageContainerPress = () => {
    navigation.navigate("DropDown");
  };
  const handleNotificationScreen = () =>{
    setCurrentPage("Notifications");
    navigation.navigate("Notification");
  };

  const handleHelplineScreen = () =>{
    setCurrentPage("Helpline");
    navigation.navigate("Helpline");
  }

  const handleAccountScreen = () =>{
    setCurrentPage("Account");
    navigation.navigate("Account");
  }


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title1}>Hi sanny 👋</Text>

        <TouchableOpacity activeOpacity={1} style={styles.bottomBarButton}>
          <EvilIcons name="search" size={30} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <Slider />
      {/* All Main */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Repeat the above Text components with your content */}
          
          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            onPress={handleImageContainerPress}
          >
            <FontAwesome name="calendar" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            // onPress={handleUniformContainerPress}
          >
            <FontAwesome5 name="tshirt" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Uniform</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            // onPress={handleUniformContainerPress}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Joining</Text>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            // onPress={handleUniformContainerPress}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>complaint</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            // onPress={handleUniformContainerPress}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Joining</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.imagecointainer}
            // onPress={handleUniformContainerPress}
          >
            <AntDesign name="addusergroup" size={30} style={styles.mainIcon} />
            <Text style={styles.text}>Joining</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.bottomBarButton, currentPage === "Home" && styles.activeButton]}
          onPress={() => setCurrentPage("Home")}
        >
          <FontAwesome name="home" size={20} style={[styles.menuIcon, currentPage === "Home" && styles.activeIcon]} />
          <Text style={[styles.bottomBarButtonText, currentPage === "Home" && styles.activeButtonText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[styles.bottomBarButton, currentPage === "Notifications" && styles.activeButton]}
          onPress={handleNotificationScreen}
        >
          <FontAwesome name="bell" size={20} style={[styles.menuIcon, currentPage === "Notifications" && styles.activeIcon]} />
          <Text style={[styles.bottomBarButtonText, currentPage === "Notifications" && styles.activeButtonText]}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[styles.bottomBarButton, currentPage === "Helpline" && styles.activeButton]}
          onPress={handleHelplineScreen}
        >
          <Entypo name="old-phone" size={20} style={[styles.menuIcon, currentPage === "Helpline" && styles.activeIcon]} />
          <Text style={[styles.bottomBarButtonText, currentPage === "Helpline" && styles.activeButtonText]}>Helpline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[styles.bottomBarButton, currentPage === "Account" && styles.activeButton]}
          onPress={handleAccountScreen}
        >
          <MaterialCommunityIcons name="account" size={20} style={[styles.menuIcon, currentPage === "Account" && styles.activeIcon]} />
          <Text style={[styles.bottomBarButtonText, currentPage === "Account" && styles.activeButtonText]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    justifyContent: "space-between",
    flexWrap:"wrap",
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingTop: 40,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 60,
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
  scrollContent: {
    flexGrow: 1,
    padding:10
  },
  content: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap : "wrap",
    backgroundColor:"#fff",
    marginTop: 10,
    // width: 340,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: "hidden",
  },
  imagecointainer: {
    width: "30%",
    height: 100,
    backgroundColor: "#184562",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },

 
  pageIndicator: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  pageIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  pageIndicatorDotActive: {
    backgroundColor: "#184562",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
  },
  bottomBarButton: {
    alignItems: "center",
  },
  bottomBarButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#928D8C",
  },
  menuIcon: {
    color: "#928D8C",
  },
  activeButtonText: {
    color: "#184",
  },
  activeIcon: {
    color: "#184",
  },
});
