import Button from './Button';
import { View, Text, StyleSheet } from 'react-native';

const DirectionPicker = ({ isInbound, setIsInboundFunction, lineColor }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        text={'↑'}
        isActive={!isInbound}
        buttonPressedFunction={() => setIsInboundFunction(false)}
        lineColor={lineColor}
      />
      <Text style={styles.directonText}>Direction</Text>
      <Button
        text={'↓'}
        isActive={isInbound}
        buttonPressedFunction={() => setIsInboundFunction(true)}
        lineColor={lineColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  directonText: {
    fontSize: 20,
  },
});

export default DirectionPicker;
