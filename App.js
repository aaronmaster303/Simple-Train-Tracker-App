import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import LinePicker from './components/LinePicker';
import Toggle from './components/Toggle';

const App = () => {
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header text={'MBTA Train Tracker'} />
          <LinePicker
            selectedLine={selectedLine}
            lineList={lines}
            lineSelectedFunction={setSelectedLine}
          />
          <Toggle isTrain={isTrain} toggleSetFunction={setIsTrain} />
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
                {station.status && (
                  <Text style={styles.stationStatus}>{`(${station.status})`}</Text>
                )}
              </View>
            ))}
          </ScrollView>
          <Text style={styles.footer}>Displaying all train locations.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
  dropdown: {
    marginBottom: 20,
    alignItems: 'center',
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

export default App;
