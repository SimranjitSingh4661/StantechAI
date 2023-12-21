import React, {Component} from 'react';
import Config from 'react-native-config';
import {ScreenContainer, StyledText} from '../../components/atoms';

class WelcomeScreen extends Component {
  render() {
    console.log({config: Config.getConstants()});
    return (
      <ScreenContainer center>
        <StyledText color="black">Welcome Screen</StyledText>
      </ScreenContainer>
    );
  }
}

export default WelcomeScreen;
