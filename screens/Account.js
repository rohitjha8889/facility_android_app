import { View, Text, StyleSheet } from 'react-native'

import React, {useContext} from 'react';
import { DataContext } from '../Data/DataContext';

const Account = () => {
  const {IP_ADDRESS} = useContext(DataContext)
  return (
    <View style={styles.cointainer}>
      <Text style={styles.text}>Account</Text>
    </View>
  )
}

export default Account

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