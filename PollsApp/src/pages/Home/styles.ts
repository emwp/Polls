import styled from 'styled-components/native'
import EvaIcon from 'react-native-eva-icons/icons/InfoOutline'

export const CardContainer = styled.View`
  padding: 10px;
  background-color: #fff;
  min-height: 300px;
  border-radius: 10px;
`

export const HomeContainer = styled.View`
  justify-content: space-between;
  padding: 30px 0;
  align-items: center;
`

export const PollTitle = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: #24243e;
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
  border: 2px solid #ccc;
  border-radius: 10px;
`

