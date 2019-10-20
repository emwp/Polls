import styled from 'styled-components/native'
// import { Icon as EvaIcon } from 'react-native-eva-icons'
import EvaIcon from 'react-native-eva-icons/icons/InfoOutline'

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

export const Icon = styled(EvaIcon)`
  margin: 0 10px;
  width: 32px;
  height: 32px;
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

