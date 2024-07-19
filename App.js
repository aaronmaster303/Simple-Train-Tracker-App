import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './components/Header';
import LinePicker from './components/LinePicker';
import Toggle from './components/Toggle';
import Button from './components/Button';
import StopList from './components/StopList';
import Footer from './components/Footer';
import getColorsFromVehicleId from './constants/Colors';

const App = () => {
  const API_KEY = '2a9bf598d2584bda8a3aec32f176044e';

  const [selectedLine, setSelectedLine] = useState('Green-E');
  const [selectedTrain, setSelectedTrain] = useState('Green-E');
  const [selectedBus, setSelectedBus] = useState('39');
  const [isTrain, setIsTrain] = useState(true);
  const [isInbound, setIsInbound] = useState(true);
  const [lines, setLines] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [stopList, setStopList] = useState([]);
  const [lineColor, setLineColor] = useState(getColorsFromVehicleId('Green-E'));
  const [vehicleLocations, setVehicleLocations] = useState();
  const [counter, setCounter] = useState(0);

  const selectedLineRef = useRef(selectedLine);

  const getInitialData = async () => {
    try {
      const line = await AsyncStorage.getItem('selectedLine');
      if (line !== null) {
        setSelectedLine(line);
      }
    } catch (e) {
      setSelectedLine('Green-E');
      console.log('No previously selected line');
    }

    try {
      const train = await AsyncStorage.getItem('selectedTrain');
      if (train !== null) {
        setSelectedTrain(train);
      }
    } catch (e) {
      setSelectedTrain('Green-E');
      console.log('No previously selected train');
    }

    try {
      const bus = await AsyncStorage.getItem('selectedBus');
      if (bus !== null) {
        setSelectedBus(bus);
      }
    } catch (e) {
      setSelectedBus('39');
      console.log('No previously selected bus');
    }

    try {
      const isTrainToggled = await AsyncStorage.getItem('isTrain');
      if (isTrainToggled !== null) {
        setIsTrain(isTrainToggled === 'true');
      }
    } catch (e) {
      setIsTrain(true);
      console.log('No isTrain toggled');
    }
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
      console.log('Failed to save data');
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    storeData('selectedLine', selectedLine);
    selectedLineRef.current = selectedLine;
    isTrain ? setSelectedTrain(selectedLine) : setSelectedBus(selectedLine);
  }, [selectedLine]);

  useEffect(() => {
    storeData('selectedBus', selectedBus);
  }, [selectedBus]);

  useEffect(() => {
    storeData('selectedTrain', selectedTrain);
  }, [selectedTrain]);

  useEffect(() => {
    storeData('isTrain', isTrain);
    fetchVehicleList();
    selectedLineRef.current = isTrain ? selectedTrain : selectedBus;
    setCounter(0);
  }, [isTrain]);

  useEffect(() => {
    fetchStopList();
    fetchTrainLocations();
    setLineColor(getColorsFromVehicleId(selectedLineRef.current));
  }, [isTrain, selectedLine]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrainLocations();
      setCounter((prevCounter) => prevCounter + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    fetchTrainLocations();
    setCounter(0);
  }, [isInbound]);

  const fetchVehicleList = async () => {
    const url = `https://api-v3.mbta.com/routes?filter[type]=${
      isTrain ? '0,1' : '3'
    }&api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const allLines = data.data;
      const lines = allLines.filter((line) => line.id !== 'Mattapan');
      setLines(lines.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error('Error fetching lines:', error);
    }
  };

  const fetchStopList = async () => {
    const url = `https://api-v3.mbta.com/stops?filter[route]=${selectedLineRef.current}&filter[direction_id]=1&api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const stops = data.data.map((stop) => ({
        name: stop.attributes.name,
      }));

      setStopList(stops);
      setVehicleLocations([]);
    } catch (error) {
      console.error('Error fetching stop list:', error);
      setFetchError(true);
    }
  };

  const fetchStopNameFromId = async (stopId) => {
    const url = `https://api-v3.mbta.com/stops/${stopId}?api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data.attributes.name;
    } catch (error) {
      console.error('Error fetching stop name:', error);
      setFetchError(true);
    }
  };

  const fetchTrainLocations = async () => {
    const url = `https://api-v3.mbta.com/vehicles?filter[route]=${selectedLineRef.current}&filter[direction_id]=${isInbound ? 1 : 0}&api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const vehicles = data.data;

      if (vehicles.length > 0) {
        const vehicleLocations = await Promise.all(
          vehicles.map(async (vehicle) => {
            const stopId = vehicle.relationships.stop.data.id;
            const name = await fetchStopNameFromId(stopId);
            const status = vehicle.attributes.current_status;
            return { name, status };
          }),
        );
        // console.log(vehicleLocations);
        setVehicleLocations(vehicleLocations);
        setFetchError(false);
      } else {
        setFetchError(true);
      }
    } catch (error) {
      console.error('Error fetching train locations:', error);
      setFetchError(true);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: lineColor.lighter }]}>
        <View style={styles.container}>
          <Header />
          <LinePicker
            selectedLine={selectedLineRef.current}
            lineList={lines}
            lineSelectedFunction={setSelectedLine}
          />
          <Toggle isTrain={isTrain} toggleSetFunction={setIsTrain} lineColor={lineColor} />
          <View style={styles.buttonContainer}>
            <Button
              text={'Outbound'}
              isActive={!isInbound}
              buttonPressedFunction={() => setIsInbound(false)}
              lineColor={lineColor}
            />
            <Button
              text={'Inbound'}
              isActive={isInbound}
              buttonPressedFunction={() => setIsInbound(true)}
              lineColor={lineColor}
            />
          </View>
          <StopList stopList={stopList} vehicleLocations={vehicleLocations} lineColor={lineColor} />
          <Footer isFailing={fetchError} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffd8a6',
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
