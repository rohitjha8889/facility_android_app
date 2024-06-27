import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ActivityIndicator
} from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import Slider from "../components/Slider2";
import { DataContext } from "../Data/DataContext";
import generateOTP from "../components/GenerateOtp";


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(""); // State to store the generated OTP
  const [employeeDetail, setEmployeeDetail] = useState(null)
  
  const { loginEmployee } = useContext(DataContext);

 

  const handleOtp = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Enter a 10-digit number");
    } else {
      setLoading(true);
      loginEmployee(phoneNumber)
        .then((employeeData) => {
          // Handle the employee data
          setEmployeeDetail(employeeData)
          const otpGenerate = generateOTP().toString();
          // console.log(otpGenerate);

          navigation.navigate('OTPScreen', { phoneNumber, sendOtp: otpGenerate, employeeData:employeeData });

           // Send OTP via the separate function
        sendOtp(otpGenerate, phoneNumber)
        .then((success) => {
          if (success) {
            setGeneratedOtp(otpGenerate); // Set the generated OTP
            
            // navigation.navigate('OTPScreen', { phoneNumber, sendOtp: otpGenerate, employeeData:employeeData });
          } else {
            Alert.alert("Error sending OTP", "Please try again later.");
          }
          setLoading(false);
        });


        })
        .catch((error) => {
          Alert.alert(
            "Sorry",
            "You are not part of Metrolite. If you are part, then contact Metrolite helpline."
          );
          setLoading(false);
        });
    }
  };

  


  const sendOtp = (otp, phoneNumber) => {
    const authKey = '368636AhgCa8iWjB616d1c8aP1';
    const sender = 'MSPLHS';
    const route = '4';
    const country = '91';
    const dltTeId = '1307171645767421800';
    const message = `${otp} is your verification code for Metrolite Mobile App`;
  
    const apiUrl = `https://admin.bulksmslogin.com/api/sendhttp.php?authkey=${authKey}&mobiles=${country}${phoneNumber}&message=${encodeURIComponent(message)}&sender=${sender}&route=${route}&country=${country}&DLT_TE_ID=${dltTeId}`;
  
    return fetch(apiUrl)
      .then(response => response.text())
      .then(data => {
        console.log("OTP sent successfully:", data);
        return true;
      })
      .catch(error => {
        console.error("Error sending OTP:", error);
        return false;
      });


    console.log(otp)
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Slider />
          <View style={styles.loginField}>
            <View style={styles.inputContainer}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={whatsappUpdates}
                onValueChange={setWhatsappUpdates}
                color={whatsappUpdates ? "#184562" : undefined}
              />
              <Text style={styles.checkboxLabel}>
                Get account updates on WhatsApp
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                phoneNumber.length !== 10 && styles.buttonDisabled
              ]}
              onPress={handleOtp}
              disabled={phoneNumber.length !== 10}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Get OTP</Text>
              )}
            </TouchableOpacity>
            
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loginField: {
    padding: 20,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 20,
    width: "100%",
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    height: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#184562",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Login;
