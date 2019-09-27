import React from 'react'
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>PollsApp</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export { App }
