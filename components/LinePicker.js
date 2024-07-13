import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LinePicker = ({ selectedLine, lineList, lineSelectedFunction }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        onValueChange={(value) => lineSelectedFunction(value)}
        selectedValue={selectedLine}
        style={styles.picker}>
        {lineList.map((line) => (
          <Picker.Item key={line.value} label={line.label} value={line.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: -75,
    marginBottom: -30,
    overflow: 'hidden',
  },
});

export default LinePicker;
