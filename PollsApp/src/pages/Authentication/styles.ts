import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled(LinearGradient).attrs({
  colors: ['#0f0c29', '#302b63', '#24243e'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
  /* justify-content: space-between; */
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  padding: 20px 20px;
  text-align: center;
`

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

export const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  margin: 10px 0;
  align-self: center;
  padding: 10px 15px;
  border-radius: 5px;    
  border: 2px solid #457fca;
  background-color: #457fca;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  padding: 3px;
  color: #fff;
  text-align: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const AuthOptions = styled.View`
  flex-grow: 2;
  /* justify- */
  /* flex: 0; */
`