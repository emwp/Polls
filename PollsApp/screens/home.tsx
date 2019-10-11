import React, { FC } from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

interface Props {
  navigation: NavigationStackProp
}

export const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Home Screen</Text>
      <Button
        title='Go To Auth Screen'
        onPress={() => navigation.navigate('Auth')}
      />
    </View>
  )
}