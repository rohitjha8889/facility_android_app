import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View style={styles.cointainer}>
      <Text style={styles.text}>Notification</Text>
    </View>
  )
}

export default Notification


const styles= StyleSheet.create({
    cointainer:{
        flex:1,
        alignSelf: "center",
        justifyContent: "center",
    },
    text:{
      fontSize: 20,
      fontWeight: "bold",
    }
})