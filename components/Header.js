import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { DataContext } from '../Data/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
    const { userDetail } = useContext(DataContext)

    let firstName = '';

    if (userDetail && userDetail.employeeName) {
        const userNameArray = userDetail.employeeName.split(' '); // Split by whitespace
        firstName = userNameArray[0]; // Take the first word
    }

    useEffect(()=>{
// console.log(userDetail)
    },[userDetail])



    return (
        <View style={styles.header}>
            <Image
                source={require("../images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
           
            <Text style={styles.title1}>Hi {firstName} 👋</Text>
            <TouchableOpacity activeOpacity={1} style={styles.bottomBarButton}>
                <EvilIcons name="search" size={30} style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#FFF",
        // marginTop: 20,
        padding: 10,
        alignContent: "center",
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
})

export default Header