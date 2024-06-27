import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const refs = useRef([]);
  const route = useRoute();
  const { phoneNumber, sendOtp, employeeData } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);


  useEffect(()=>{
    // console.log(employeeData)
  },[employeeData])


  useEffect(()=>{
    // console.log(phoneNumber, sendOtp)
    // console.log(employeeData)
  },[phoneNumber, sendOtp])

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, value) => {
    if (!value && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      refs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async() => {
    const enteredOtp = otp.join("");
    const isOtpValid = enteredOtp === sendOtp || enteredOtp === "9853"; // Check against both the generated OTP and the hardcoded OTP
  
    if (isOtpValid) {
      try {
        await AsyncStorage.setItem('employeeData', JSON.stringify(employeeData));
        
        setOtp(["", "", "", ""]);
       
        
        navigation.navigate("MainTabs");
      } catch (error) {
        console.error('Error storing employee data', error);
      }
    } else {
      Alert.alert("Invalid OTP");
      setOtp(["", "", "", ""]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.mainHeader}>
            <Text style={styles.headerText}>Enter OTP</Text>
            <Text style={styles.subHeaderText}>OTP sent to {phoneNumber}</Text>
          </View>
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <View key={index} style={styles.otpBox}>
                <TextInput
                  ref={(el) => (refs.current[index] = el)}
                  style={[styles.otpInput, value && styles.otpInputFilled]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleOtpChange(index, text)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index, value);
                    }
                  }}
                />
              </View>
            ))}
          </View>
          <Text style={styles.timerText}>Resend OTP in {countdown} seconds</Text>
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  mainHeader: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#184562',
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: 'gray',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  otpBox: {
    borderWidth: 2,
    borderColor: '#ccc',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  otpInput: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  otpInputFilled: {
    borderColor: '#184562',
  },
  timerText: {
    fontSize: 14,
    textAlign: "center",
    color: '#00456e',
  },
  verifyButton: {
    width: "90%",
    backgroundColor: "#184562",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 30,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Otp;
