import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

import { useGetUserPollsQuery } from '../../graphql/generated/graphql'
import { getToken } from '../../utils'
import { Screens } from '../../navigation/Navigator'

import {
  Container,
  Spacer,
  Title,
  Text,
  SecondaryText,
  ButtonContainer,
  ButtonText,
} from '../../components'
import { CardContainer, HomeContainer, PollTitle, PollItem, Icon } from './styles'

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
        <PollTitle>{poll.name}</PollTitle>
        <Icon />
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
        <>
          <HomeContainer>
            <Title>Welcome Everton</Title>
            <SecondaryText>
              Create a poll and ask your friends about their opinions.
            </SecondaryText>
            <Spacer />
            <ButtonContainer onPress={() => console.log('pei')}>
              <ButtonText>Create Poll</ButtonText>
            </ButtonContainer>
            <ButtonContainer onPress={() => console.log('pei')}>
              <ButtonText>Join Poll</ButtonText>
            </ButtonContainer>
          </HomeContainer>

          <Text>Your Polls</Text>
          <Spacer/>
          <CardContainer>
            <FlatList
              data={data.getUserPolls}
              renderItem={({ item }) => Item(item)}
              keyExtractor={item => item.id}
            />
          </CardContainer>
        </>
      )}
    </Container>
  )
}
