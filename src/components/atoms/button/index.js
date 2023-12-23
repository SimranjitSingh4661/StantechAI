import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import StyledText from '../styledText';
import {COLORS} from '../../../constants';

const Button = ({text, onPress}) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <StyledText color={COLORS.BLUE} textStyle={styles.text}>
        {text}
      </StyledText>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    elevation: 4,
    borderRadius: 50,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
