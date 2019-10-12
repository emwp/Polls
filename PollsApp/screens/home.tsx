import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

interface Props {
  navigation: NavigationStackProp
}

export const HomeScreen: FC<Props> = () => {
  const {data, loading} = useQuery(gql`
  query {
    hello
  }
  `)

  if (loading) {
    return (
      <View>
        <Text>
          Loading
        </Text>
      </View>
    )
  }
  return (
    <View>
      {console.log(data)}
      <Text>
        {JSON.stringify(data)}
      </Text>
    </View>
  )
}
