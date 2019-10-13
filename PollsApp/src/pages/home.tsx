import React, { useState } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { getToken, removeToken } from '../utils'
import { Screens } from '../navigation/Navigator'
import { ScrollView } from 'react-native-gesture-handler'

interface Props {
  navigation: NavigationStackProp
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  getToken().then(res => {
    if (res === '') {
      navigation.navigate(Screens.AUTH)
    } else {
      setToken(res)
      setLoading(false)
    }
  })

  return (
    <ScrollView>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <Text>{token}</Text>
          <Button title="remove" onPress={removeToken} />
        </View>
      )}
    </ScrollView>
  )
}
