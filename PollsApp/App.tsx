import React, { FC } from 'react'
import { View, Text, Button } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator, NavigationStackProp, NavigationStackScreenComponent } from 'react-navigation-stack'

interface Props {
  navigation: NavigationStackProp
}

const DetailsScreen: FC<Props> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Home Screen</Text>
      <Button
        title='Go To Details Screen'
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home'
  }
)

export default createAppContainer(AppNavigator)
