import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

interface Props {
  navigation: NavigationStackProp
}

export const AuthScreen: FC<Props> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Auth Screen</Text>
    </View>
  )
}