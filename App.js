import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import LinePicker from './components/LinePicker';
import Toggle from './components/Toggle';
import Button from './components/Button';
import StopList from './components/StopList';
import Footer from './components/Footer';

const App = () => {
  const API_KEY = '2a9bf598d2584bda8a3aec32f176044e';

  const [selectedLine, setSelectedLine] = useState('Green-E');
  const [isTrain, setIsTrain] = useState(true);
  const [isInbound, setIsInbound] = useState(true);
  const [lines, setLines] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [stopList, setStopList] = useState([]);

  useEffect(() => {
    const url = `https://api-v3.mbta.com/routes?filter[type]=${
      isTrain ? '0,1' : '3'
    }&api_key=${API_KEY}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const allLines = data.data;
        const lines = allLines.filter((line) => line.id != 'Mattapan');
        setLines(lines.sort((a, b) => a.id - b.id));
      } catch (error) {}
    };

    fetchData();
  }, [isTrain]);

  useEffect(() => {
    const url = `https://api-v3.mbta.com/stops?filter[route]=${selectedLine}&filter[direction_id]=1&api_key=${API_KEY}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        stops = data.data.map((stop) => ({
          id: stop.id,
          name: stop.attributes.name,
        }));

        setStopList(stops);
        setFetchError(false);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchData();
  }, [selectedLine]);

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
          <StopList stopList={stopList} />
          <Footer isFailing={fetchError} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'beige',
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
