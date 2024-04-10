import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import MainScreen from './MainScreen'

export default function App() {
  return (
    <SafeAreaView>
    <View >
      <View >
      <Text style={{marginHorizontal:125,marginTop:50,marginBottom:20,fontSize:26,fontWeight:'bold', color:"pink" , flexDirection:"row"}}> ToDo Dude</Text>
      </View>
      <MainScreen/>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})