import React, { useState, useRef } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import loginImage from "../images/login.png";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigation = useNavigation();
  const refs = useRef([]);

  const handleNavigate = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Enter a 10-digit number");
    } else {
      setShowOtpInput(true);
    }
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
          <View style={styles.mobile}>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>

          {showOtpInput && (
            <>
              <View style={styles.otpContainer}>
                {otp.map((value, index) => (
                  <View key={index} style={styles.otpBox}>
                    <TextInput
                      ref={(el) => (refs.current[index] = el)}
                      style={[styles.otpInput, value && styles.otpInputFilled]}
                      placeholder="0"
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
                onPress={() => {
                  if (otp.join("").length === 4) {
                    // Perform OTP verification here
                    // console.log("OTP Verified:", otp.join(""));
                    navigation.navigate("DashboardScreen");
                  } else {
                    Alert.alert("Enter a valid OTP");
                  }
                }}
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
  mobile: {
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: "#184562",
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
  },
  buttonText: {
    color: "#184562",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
