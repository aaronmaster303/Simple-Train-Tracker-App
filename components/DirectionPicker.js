import Button from './Button';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const DirectionPicker = ({ isInbound, setIsInboundFunction, lineColor }) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.directionText}>Direction</Text>
      {/* <Pressable onPress={() => setIsInboundFunction(false)}> */}
      <Pressable onPress={() => console.log(false)}>
        <Text style={styles.directionText}>↑</Text>
      </Pressable>
      {/* <Pressable onPress={() => setIsInboundFunction(true)}> */}
      <Pressable onPress={() => console.log(true)}>
        <Text style={styles.directionText}>↓</Text>
      </Pressable>
      {/* <Button */}
      {/*   text={'↑'} */}
      {/*   isActive={!isInbound} */}
      {/*   buttonPressedFunction={() => setIsInboundFunction(false)} */}
      {/*   lineColor={lineColor} */}
      {/* /> */}
      {/* <Button */}
      {/*   text={'↓'} */}
      {/*   isActive={isInbound} */}
      {/*   buttonPressedFunction={() => setIsInboundFunction(true)} */}
      {/*   lineColor={lineColor} */}
      {/* /> */}
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
  directionText: {
    fontSize: 20,
  },
});

export default DirectionPicker;
