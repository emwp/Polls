import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { HomeScreen } from '../pages/home'
import { AuthScreen } from '../pages/authentication'

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