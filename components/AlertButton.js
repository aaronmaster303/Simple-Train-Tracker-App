import { StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

const AlertButton = () => {
  return (
    <TouchableOpacity style={[styles.main]} onPress={() => buttonPressedFunction()}>
      <Text style={styles.buttonText}>W</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    right: 20,
    top: 8,
  },
  buttonText: {},
});

export default AlertButton;
