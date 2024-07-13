import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import LinePicker from './components/LinePicker';
import Toggle from './components/Toggle';
import Button from './components/Button';
import StopList from './components/StopList';
import Footer from './components/Footer';

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
          <Header />
          <LinePicker
            selectedLine={selectedLine}
            lineList={lines}
            lineSelectedFunction={setSelectedLine}
          />
          <Toggle isTrain={isTrain} toggleSetFunction={setIsTrain} />
          <View style={styles.buttonContainer}>
            <Button
              text={'Outbound'}
              isActive={!isInbound}
              buttonPressedFunction={() => setIsInbound(false)}
            />
            <Button
              text={'Inbound'}
              isActive={isInbound}
              buttonPressedFunction={() => setIsInbound(true)}
            />
          </View>
          <StopList stationList={stations} />
          <Footer isFailing={true} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#28a745',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default App;
