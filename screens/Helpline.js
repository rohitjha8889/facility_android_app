import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Helpline = () => {
  return (
    <View style={styles.cointainer}>
      <Text style={styles.text}>Helpline</Text>
    </View>
  )
}

export default Helpline;


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