import Button from './Button';
import { View, StyleSheet } from 'react-native';

const DirectionPicker = ({ isInbound, setIsInboundFunction, lineColor, firstStop, lastStop }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        text1={'↑'}
        text2={firstStop}
        isActive={!isInbound}
        buttonPressedFunction={() => setIsInboundFunction(false)}
        lineColor={lineColor}
      />
      <Button
        text1={'↓'}
        text2={lastStop}
        isActive={isInbound}
        buttonPressedFunction={() => setIsInboundFunction(true)}
        lineColor={lineColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20,
    marginVertical: 20,
    zIndex: 1,
    backgroundColor: '#fff',
  },
});

export default DirectionPicker;
