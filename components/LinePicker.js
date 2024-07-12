import { StyleSheet, Text, View } from 'react-native';
import Picker from 'react-native-picker-select';

const LinePicker = ({ selectedLine, lineList, lineSelectedFunction }) => {
  return (
    <View>
      <Text style={styles.dropdownLabel}>Select Line:</Text>
      <Picker
        onValueChange={(value) => lineSelectedFunction(value)}
        items={lineList}
        value={selectedLine}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default LinePicker;
