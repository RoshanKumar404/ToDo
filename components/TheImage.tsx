import { Dimensions, StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'

export default function IImage() {
  return (
    <View style={{alignItems:"center"}}>
      <Text style={{fontSize:16,fontWeight:"bold"}}>Start Adding and Make it Done</Text>
       <Image 
        source={require("../assets/todo.jpg")}
        style={styles.image}
      /> 
      
    </View>
  )
}
const {width,height}=Dimensions.get('window')
const styles = StyleSheet.create({
    image:{margin:10,
        height:height*0.7,
        width:width*0.95,
    }
})