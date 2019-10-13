import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import AsyncStorage from '@react-native-community/async-storage'

import {
  useRegisterMutation,
  useLoginMutation,
} from '../../graphql/generated/graphql'

import {
  Container,
  Title,
  Input,
  Form,
  ButtonContainer,
  ButtonText,
  Text,
  TextButton,
  AuthOptions,
} from './styles'

interface Props {
  navigation: NavigationStackProp
}

const setToken = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value)
}

export const AuthScreen: React.FC<Props> = ({ navigation }) => {

  const [authState, setAuthState] = useState('Login')
  const [email, setEmail] = useState('fullstack@gmail.com')
  const [password, setPassword] = useState('123456')
  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()

  const submitLogin = async () => {
    const result = await login({ variables: { email, password } })

    if (result.data!.login.accessToken) {
      const token = result.data!.login.accessToken
      setToken('accessToken', token)
      setEmail('')
      setPassword('')
      navigation.navigate('Home')
    }
  }

  const submitRegister = async () => {
    const result = await register({ variables: { email, password } })
    if (result.data!.register) {
      setAuthState('Login')
    }
  }

  return (
    <Container>
      <Form>
        <Title>Polls App</Title>
        <Title>{authState}</Title>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          textContentType="emailAddress"
          autoCorrect={false}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          textContentType="password"
          secureTextEntry
          autoCorrect={false}
        />
        <ButtonContainer
          onPress={authState === 'Register' ? submitRegister : submitLogin}>
          <ButtonText>{authState}</ButtonText>
        </ButtonContainer>
      </Form>
      <AuthOptions>
        {authState === 'Login' ? (
          <Text>
            Don't have an account yet?
            <TextButton onPress={() => setAuthState('Register')}>
              {' '}
              Signup!
            </TextButton>
          </Text>
        ) : (
          <Text>
            I already have an account!
            <TextButton onPress={() => setAuthState('Login')}>
              {' '}
              Login!
            </TextButton>
          </Text>
        )}
      </AuthOptions>
    </Container>
  )
}
