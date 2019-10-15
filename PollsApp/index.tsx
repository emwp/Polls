import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './src/navigation/Navigator'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getToken } from './src/utils'
if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() => console.log('Reactotron Configured!'))
}

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/graphql',
  request: async (operation) => {
    const token = await getToken()
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
})

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
)

AppRegistry.registerComponent('PollsApp', () => App)
