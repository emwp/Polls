import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'

import {
  useRegisterMutation,
  useLoginMutation,
} from '../../graphql/generated/graphql'
import { setToken, TOKEN_NAME } from '../../utils'

import { Input, Form, AuthOptions } from './styles'
import {
  Container,
  Title,
  ButtonContainer,
  ButtonText,
  Text,
  TextButton,
} from '../../components'

interface Props {
  navigation: NavigationStackProp
}

export const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const [authState, setAuthState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()

  const submitLogin = async () => {
    const result = await login({ variables: { email, password } })

    if (result.data!.login.accessToken) {
      const token = result.data!.login.accessToken
      setToken(TOKEN_NAME, token)
      setEmail('')
      setPassword('')
      navigation.push('Home')
    }
  }

  const submitRegister = async () => {
    const result = await register({ variables: { name, email, password } })
    if (result.data!.register) {
      setAuthState('Login')
    }
  }

  return (
    <Container>
      <Form>
        <Title>Polls App</Title>
        <Title>{authState}</Title>
        { authState === 'Register' &&
          <Input
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            textContentType="name"
            autoCorrect={false}
          />
        }
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
