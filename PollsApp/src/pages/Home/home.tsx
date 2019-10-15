import React, { useState, useEffect } from 'react'
import { View, Button, ActivityIndicator, FlatList } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

import { useGetUserPollsQuery } from '../../graphql/generated/graphql'
import { getToken, removeToken } from '../../utils'
import { Screens } from '../../navigation/Navigator'

import { Container } from '../../components'
import { CardContainer, Text, PollItem, FaIcon } from './styles'

interface Props {
  navigation: NavigationStackProp
}

interface Poll {
  id: string
  name: string
  moderated: boolean
  open: boolean
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { data, loading } = useGetUserPollsQuery({
    fetchPolicy: 'network-only',
  })
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    getToken().then(res => {
      if (res === '') {
        navigation.navigate(Screens.AUTH)
      } else {
        setIsAuth(true)
      }
    })
  }, [navigation])

  const Item = (poll: Poll) => {
    return (
      <PollItem>
        <Text>{poll.name}</Text>
        <FaIcon name="info-circle" size={30} color="purple"/>
      </PollItem>
    )
  }

  return (
    <Container>
      {!isAuth || loading || !data ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <CardContainer>
          <FlatList
            data={data.getUserPolls}
            renderItem={({ item }) => Item(item)}
            keyExtractor={item => item.id}
          />
        </CardContainer>
      )}
      <Button title="Remove Token" onPress={removeToken} />
    </Container>
  )
}
