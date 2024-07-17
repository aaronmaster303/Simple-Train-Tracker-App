import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LinePicker = ({ selectedLine, lineList, lineSelectedFunction }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        onValueChange={(value) => lineSelectedFunction(value)}
        selectedValue={selectedLine}
        style={styles.picker}>
        {lineList.map((line) => (
          <Picker.Item key={line.id} label={line.id} value={line.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: -40,
    marginBottom: -60,
    overflow: 'hidden',
  },
});

export default LinePicker;
