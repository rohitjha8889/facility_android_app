import React, { useState, useRef, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import loginImage from "../images/login.png";
import { DataContext } from "../Data/DataContext";
import generateOTP from "../components/GenerateOtp";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [generatedOtp, setGeneratedOtp] = useState(""); // State to store the generated OTP
  const [employeeDetail, setEmployeeDetail] = useState(null)

  const navigation = useNavigation();
  const refs = useRef([]);
  const { loginEmployee } = useContext(DataContext);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  // const sendOTP = (otp) => {
  //   const authKey = '368636AhgCa8iWjB616d1c8aP1';
  //   const sender = 'MSPLHS';
  //   const route = '4';
  //   const country = '91';
  //   const dltTeId = '1307171645767421800';
  //   const message = `${otp} is your verification code for Metrolite Mobile App`;

  //   const apiUrl = `http://admin.bulksmslogin.com/api/sendhttp.php?authkey=${authKey}&mobiles=${country}${mobileNumber}&message=${encodeURIComponent(message)}&sender=${sender}&route=${route}&country=${country}&DLT_TE_ID=${dltTeId}`;

  //   // Send OTP via the Bulk SMS API
  //   fetch(apiUrl)
  //     .then(response => response.text())
  //     .then(data => {

  //       navigation.navigate('OTPScreen', { mobileNumber, otp });
  //     })
  //     .catch(error => {
  //       console.error("Error sending OTP:", error);
  //       alert("Error sending OTP. Please try again.");
  //     });
  // }

  const handleNavigate = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Enter a 10-digit number");
    } else {
      setLoading(true);
      loginEmployee(phoneNumber)
        .then((employeeData) => {
          // Handle the employee data
          setEmployeeDetail(employeeData)
          const otpGenerate = generateOTP().toString();
          console.log(otpGenerate);

           // Send OTP via the separate function
        sendOtp(otpGenerate, phoneNumber)
        .then((success) => {
          if (success) {
            setGeneratedOtp(otpGenerate); // Set the generated OTP
            setShowOtpInput(true);
            setDisabled(true);
            startTimer();
            // navigation.navigate('OTPScreen', { phoneNumber, otp: otpGenerate });
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
  };

  

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setDisabled(false);
          return 30;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, value) => {
    if (value === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      refs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    const isOtpValid = enteredOtp === generatedOtp || enteredOtp === "9853"; // Check against both the generated OTP and the hardcoded OTP
  
    if (isOtpValid) {
      try {
        await AsyncStorage.setItem('employeeData', JSON.stringify(employeeDetail));
        setPhoneNumber("");
        setOtp(["", "", "", ""]);
        setShowOtpInput(false);
        setGeneratedOtp("");
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
    <>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image
            source={loginImage}
            style={styles.loginImage}
            resizeMode="contain"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!showOtpInput} // Set editable prop based on showOtpInput state
          />

          <TouchableOpacity
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={handleNavigate}
            disabled={disabled}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#184562" />
            ) : (
              <Text style={styles.buttonText}>
                {disabled ? `Resend OTP in ${timer}s` : "Get OTP"}
              </Text>
            )}
          </TouchableOpacity>

          {showOtpInput && (
            <>
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

              <TouchableOpacity
                style={styles.buttonVerify}
                onPress={verifyOtp}
              >
                <Text style={styles.buttonTextVerify}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  imageBox: {
    width: "100%",
    height: "40%",
  },
  loginImage: {
    width: "100%",
    height: "100%",
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: "#184562",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  otpBox: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#184562",
  },
  otpInput: {
    fontSize: 18,
    textAlign: "center",
    color: "#184562",
  },
  otpInputFilled: {
    color: "#184562",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    color: "#184562",
  },
  buttonText: {
    color: "#184562",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDisabled: {
    color: "#aaa",
  },
  buttonVerify: {
    backgroundColor: "#184562",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "30%",
    alignSelf: "center",
  },
  buttonTextVerify: {
    color: "#fff",
  },
});
