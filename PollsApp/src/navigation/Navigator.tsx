import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { HomeScreen } from '../pages/home'
import { AuthScreen } from '../pages/Authentication/authentication'

export const Screens = {
  HOME: 'Home',
  AUTH: 'Auth',
  CREATE_POLL: 'CreatePoll'
}

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
    initialRouteName: Screens.HOME,    
  }
)

export default createAppContainer(AppNavigator)