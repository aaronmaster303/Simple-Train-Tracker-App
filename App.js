import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import LinePicker from './components/LinePicker';
import Toggle from './components/Toggle';
import StopList from './components/StopList';
import Footer from './components/Footer';
import DirectionPicker from './components/DirectionPicker';
import getColorsFromVehicleId from './constants/Colors';
import HorizontalLine from './components/HorizontalLine';

const App = () => {
  // const SERVER_BASE_URL = 'http://localhost:3000';
  // const SERVER_BASE_URL = 'http://172.20.0.25:3000';
  const SERVER_BASE_URL = 'https://simple-train-tracker-app-server-production.up.railway.app';

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

  useEffect(() => {
    selectedLineRef.current = selectedLine;
    isTrain ? setSelectedTrain(selectedLine) : setSelectedBus(selectedLine);
  }, [selectedLine]);

  useEffect(() => {
    fetchVehicleList();
    selectedLineRef.current = isTrain ? selectedTrain : selectedBus;
    setCounter(0);
  }, [isTrain]);

  useEffect(() => {
    isTrain ? fetchStopList() : fetchStopListBus();
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
    if (!isTrain) {
      fetchStopListBus();
    }
    fetchTrainLocations();
  }, [isInbound]);

  const fetchVehicleList = async () => {
    const url = `${SERVER_BASE_URL}/routes?filter[type]=${isTrain ? '0,1' : '3'}`;
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
    const url = `${SERVER_BASE_URL}/stops?filter[route]=${selectedLineRef.current}&filter[direction_id]=1`;

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

  const fetchStopListBus = async () => {
    const url = `${SERVER_BASE_URL}/stops/bus?route=${selectedLineRef.current}&direction_id=${isInbound ? 1 : 0}`;

    try {
      const response = await fetch(url);
      let stops = await response.json();

      setStopList(stops);
      setVehicleLocations([]);
    } catch (error) {
      console.error('Error fetching stop list:', error);
      setFetchError(true);
    }
  };

  const fetchStopNameFromId = async (stopId) => {
    const url = `${SERVER_BASE_URL}/stops/${stopId}`;
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
    const url = `${SERVER_BASE_URL}/vehicles?filter[route]=${selectedLineRef.current}&filter[direction_id]=${isInbound ? 1 : 0}`;

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
            return { stopId, name, status };
          }),
        );
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
          <View style={styles.optionsContainer}>
            <Toggle isTrain={isTrain} toggleSetFunction={setIsTrain} lineColor={lineColor} />
            <DirectionPicker
              isInbound={isInbound}
              setIsInboundFunction={setIsInbound}
              lineColor={lineColor}
              firstStop={stopList[0] ? stopList[0].name : ''}
              lastStop={stopList[0] ? stopList.at(-1).name : ''}
            />
          </View>
          <HorizontalLine />
          <StopList stopList={stopList} vehicleLocations={vehicleLocations} lineColor={lineColor} />
          <HorizontalLine />
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
  optionsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default App;
