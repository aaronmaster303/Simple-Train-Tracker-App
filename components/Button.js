import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ text1, text2, isActive, buttonPressedFunction, lineColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive && styles.buttonActive && { backgroundColor: lineColor?.primary },
        !isActive && styles.buttonInactive,
      ]}
      onPress={() => buttonPressedFunction()}>
      <Text style={styles.buttonText}>{text1}</Text>
      <Text style={styles.buttonText2}>{text2}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: 'darkgray',
    shadowRadius: 1,
    shadowOffset: 1,
    shadowOpacity: 1,
    borderRadius: 7,
    margin: 2,
    maxWidth: 180,
    flexDirection: 'row',
  },
  buttonActive: {
    backgroundColor: '#28a745',
  },
  buttonInactive: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginEnd: 10,
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
    paddingEnd: 8,
  },
});

export default Button;
