import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './navigation/Navigator'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/graphql'
})

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
)

AppRegistry.registerComponent('PollsApp', () => App)
