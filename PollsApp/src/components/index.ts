import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface IText {
  primary?: boolean
  center?: boolean
}

interface ISecondaryText {
  primary?: boolean
}

export const Container = styled(LinearGradient).attrs({
  colors: ['#0f0c29', '#302b63', '#24243e'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  padding: 20px 20px;
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`

export const SecondaryText = styled.Text`
  font-size: 16px;
  color: ${(props : ISecondaryText) => props.primary ? '#0f0c29' : '#fff'};
  font-weight: 300;
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  margin: 10px 0;
  align-self: center;
  padding: 10px 15px;
  border-radius: 5px;    
  border: 2px solid #457fca;
  background-color: #457fca;
`;

export const Spacer = styled.View`
  padding: 10px 0;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  padding: 3px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props : IText) => props.primary ? '#0f0c29' : '#fff'};
  text-align: ${(props : IText) => props.center ? 'center' : 'left'};
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

