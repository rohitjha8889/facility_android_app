import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share, Linking, Alert } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../Data/DataContext';
import Header from '../components/Header';

const Account = () => {
  const { IP_Address, userDetail, fetchData } = useContext(DataContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect to handle loading state
  useEffect(() => {
    if (userDetail) {
      setIsLoading(false); // Once userDetail is fetched, set isLoading to false
    }
  }, [userDetail]);

  const handleRatePress = () => {
    Linking.openURL("https://play.google.com/store/apps/details?id=com.metrolitehomeservices.metrolitefacility&hl=en");
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.navigate('Login'); // Navigate to the login screen after logout
            } catch (error) {
              console.error('Error clearing AsyncStorage:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: 'Download metrolite facilaty amazing app: [https://play.google.com/store/apps/details?id=com.metrolitehomeservices.metrolitefacility]',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // If userDetail is still loading, you can show a loading indicator or null
  if (isLoading) {
    return null; // or return a loading indicator
  }

  // Once userDetail is available, render the Account screen
  const profileImage = `${IP_Address}/profileImage/${userDetail.profileImage}`;
  const defaultImageUrl = `${IP_Address}/profileImage/dummy.jpg`;

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Image
            style={styles.profileImage}
            source={userDetail.profileImage && userDetail.profileImage.trim() !== '' ? { uri: profileImage } : { uri: defaultImageUrl }}
          />
        </View>
        <View>
          <Text style={styles.profileName}>{userDetail.employeeName}</Text>
          <Text style={styles.phoneNumber}>+91 {userDetail.employeePhone}</Text>
        </View>
      </View>

      <ScrollView style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={handleRatePress}>
          <Fontisto name="like" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Rate us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={shareLink}>
          <FontAwesome name="share-alt" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Invite Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => { }}>
          <MaterialIcons name="policy" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Privacy & Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => { }}>
          <FontAwesome name="info-circle" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => { }}>
          <FontAwesome name="file-text-o" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <AntDesign name="logout" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    // marginTop: 30,
    padding: 10,
    alignItems: 'center',
    height: 60
  },
  logo: {
    width: 70,
    height: 70,
  },
  title1: {
    fontSize: 18,
    color: '#184562',
  },
  searchIcon: {
    color: '#184562',
  },
  mainIcon: {
    color: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  textheader: {
    fontSize: 18,
    fontWeight: '800',
    alignSelf: 'center',
    color: 'orange',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    color: '#50a8ed',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#184562',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#888',
  },
  menu: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    marginRight: 20,
    color: '#184562',
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  menuBalance: {
    fontSize: 16,
    color: '#28a745',
  },

  profileImage: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    borderRadius: 10
  }
});
