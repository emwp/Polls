import styled from 'styled-components/native';

export const Form = styled.View`
  margin-top: 30px;
  padding: 0 30px;
  flex-grow: 8;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  color: #000;
  background: #FFF;
  border: 2px solid #fff;
`

export const AuthOptions = styled.View`
  flex-grow: 2;
`