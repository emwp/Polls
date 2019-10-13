import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useHelloQuery } from '../graphql/generated/graphql'
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  navigation: NavigationStackProp
}

export const HomeScreen: React.FC<Props> = () => {
  const {data, loading} = useHelloQuery()
  const [ token, setToken ] = useState('')

  const getData = async () => {
      const value = await AsyncStorage.getItem('accessToken')
      setToken(value!)
  }

  if (loading || !data) {
    return (
      <View>
        <Text>
          Loading
        </Text>
      </View>
    )
  }
  return (
    <View>
      <Text>
        {data.hello}
      </Text>
      <Button
        title="GET TOKEN"
        onPress={getData}
      />
      <Text>{token}</Text>
    </View>
  )
}
