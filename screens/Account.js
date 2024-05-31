import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../Data/DataContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Account = () => {
  const { IP_ADDRESS } = useContext(DataContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout', 'You have been logged out successfully');
      navigation.navigate('Login'); // Navigate to the login screen after logout
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.menuItem, { borderBottomWidth: 0, paddingBottom: 0 }]}
        onPress={handleLogout}
      >
        <MaterialIcons name='logout' color={'grey'} size={25} />
        <Text style={styles.itemName}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  },
});
