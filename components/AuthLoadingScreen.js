import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthLoadingScreen= ({navigation}) => {

    useEffect(() => {
        checkData();
    }, []);

    

    const checkData = async () => {
        
        const employeeData = await AsyncStorage.getItem('employeeData');
        navigation.navigate(employeeData ? 'MainTabs' : 'Login');
        // console.log('Employee Data:', JSON.parse(employeeData));
    }

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
     <ActivityIndicator size="large" />
    </View>
  )
}

export default AuthLoadingScreen