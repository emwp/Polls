import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useHelloQuery } from '../graphql/generated/graphql'

interface Props {
  navigation: NavigationStackProp
}

export const HomeScreen: FC<Props> = () => {
  const {data, loading} = useHelloQuery()

  if (loading || !data) {
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
      <Text>
        {data.hello}
      </Text>
    </View>
  )
}
