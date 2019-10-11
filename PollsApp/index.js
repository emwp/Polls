import { AppRegistry } from 'react-native';
import AppNavigator from './navigation/Navigator'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator)
