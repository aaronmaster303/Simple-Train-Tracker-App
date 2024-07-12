import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState('Green-E');
  const [isTrain, setIsTrain] = useState(true);
  const [isInbound, setIsInbound] = useState(true);

  const lines = [
    { label: 'Green-E', value: 'Green-E' },
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Green-B', value: 'Green-B' },
    { label: 'Green-C', value: 'Green-C' },
    { label: 'Green-D', value: 'Green-D' },
  ];

  const stations = [
    { name: 'Heath Street', status: '' },
    { name: 'Back of the Hill', status: '' },
    { name: 'Riverway', status: '' },
    { name: 'Mission Park', status: '' },
    { name: 'Fenwood Road', status: '' },
    { name: 'Brigham Circle', status: 'Stopped at' },
    { name: 'Longwood Medical Area', status: '' },
    { name: 'Museum of Fine Arts', status: '' },
    { name: 'Northeastern University', status: 'Stopped at' },
    { name: 'Symphony', status: 'Stopped at' },
    { name: 'Prudential', status: '' },
    { name: 'Copley', status: '' },
    { name: 'Arlington', status: '' },
    { name: 'Boylston', status: '' },
    { name: 'Park Street', status: 'Stopped at' },
    { name: 'Government Center', status: '' },
    { name: 'Haymarket', status: 'Incoming at' },
    { name: 'North Station', status: '' },
    { name: 'Science Park/West End', status: '' },
    { name: 'Lechmere', status: '' },
    { name: 'East Somerville', status: 'In transit to' },
    { name: 'Gilman Square', status: '' },
    { name: 'Magoun Square', status: '' },
    { name: 'Ball Square', status: '' },
    { name: 'Medford/Tufts', status: 'Incoming at' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>MBTA Train Tracker</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>Select Line:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedLine(value)}
            items={lines}
            value={selectedLine}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Train</Text>
          <Switch value={isTrain} onValueChange={(value) => setIsTrain(value)} />
          <Text style={styles.switchLabel}>Bus</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, !isInbound && styles.buttonActive]}
            onPress={() => setIsInbound(false)}>
            <Text style={styles.buttonText}>Outbound ↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isInbound && styles.buttonActive]}
            onPress={() => setIsInbound(true)}>
            <Text style={styles.buttonText}>Inbound ↓</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {stations.map((station, index) => (
            <View key={index} style={styles.stationContainer}>
              <Text style={station.status ? styles.stationTextActive : styles.stationText}>
                {station.name}
              </Text>
              {station.status && <Text style={styles.stationStatus}>{`(${station.status})`}</Text>}
            </View>
          ))}
        </ScrollView>
        <Text style={styles.footer}>Displaying all train locations.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonActive: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  stationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  stationText: {
    fontSize: 18,
  },
  stationTextActive: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  stationStatus: {
    fontSize: 16,
    color: '#28a745',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
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

export default App;
