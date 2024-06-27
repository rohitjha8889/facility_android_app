import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { DataContext } from "../Data/DataContext";
import Header from "../components/Header";

const HelplineScreen = () => {
  const [loading, setLoading] = useState(true); // State to track loading
  const { userDetail, fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false); // Set loading to false after fetching data
    });
  }, []);

  const handleLocationPress = () => {
    const address = "1/16, 3rd Floor, Lalita Park, Laxmi Nagar, Delhi 110092";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:01146037337");
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@metrolite.co.in");
  };

  const handleWebsitePress = () => {
    Linking.openURL("https://metrolitesolutions.com/");
  };

  if (loading) {
    // Display loading indicator while fetching data
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#184562" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
     <Header/>

      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <MaterialIcons name="phone" size={24} style={styles.icon} />
          <Text style={styles.contactText}>01146037337</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <FontAwesome name="envelope" size={24} style={styles.icon} />
          <Text style={styles.contactText}>info@metrolitesolutions.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={handleWebsitePress}
        >
          <MaterialIcons name="public" size={24} style={styles.icon} />
          <Text style={styles.contactText}>www.metrolitesolutions.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={handleLocationPress}
        >
          <MaterialIcons name="location-on" size={24} style={styles.icon} />
          <Text style={styles.contactText}>
            1/16, 3rd Floor, Lalita Park, Laxmi Nagar Near Laxmi Nagar Metro gate no. - 1, Opposite of Metro pillar No. 26, Delhi 110092
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HelplineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    // marginTop: 30,
    padding: 10,
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
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  infoBox: {
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    color: "#888",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#184562",
  },
  contactContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  icon: {
    marginRight: 20,
    color: "#184562",
  },
  contactText: {
    fontSize: 16,
    flex: 1,
    color: "#184562",
  },
});
