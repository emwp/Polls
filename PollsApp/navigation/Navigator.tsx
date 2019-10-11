import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { HomeScreen } from '../screens/home'
import { AuthScreen } from '../screens/authentication'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Auth: AuthScreen
  },
  {
    initialRouteName: 'Home'
  }
)

export default createAppContainer(AppNavigator)