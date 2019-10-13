import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { HomeScreen } from '../pages/home'
import { AuthScreen } from '../pages/Authentication/authentication'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Auth: {
      screen: AuthScreen,
      navigationOptions: () => ({
        headerTransparent: true
      })
    }
  },
  {
    initialRouteName: 'Auth',    
  }
)

export default createAppContainer(AppNavigator)