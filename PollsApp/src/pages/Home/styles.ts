import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'

export const CardContainer = styled.View`
  margin: 30px 15px;
  padding: 10px;
  border: 3px solid purple;
  background-color: aqua;
  border-radius: 10px;
`

export const Text = styled.Text`
  font-size: 16;
  flex: 1;
  font-weight: bold;
  color: rebeccapurple;
  margin: 0 10px;
`

export const FaIcon = styled(Icon)`
  margin: 0 10px;
`

export const PollItem = styled.View`
  flex-direction: row;
  padding: 10px 0;
  overflow: hidden;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;
  border: 2px solid red;
  border-radius: 10px;
`

