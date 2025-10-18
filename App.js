import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AlertButton from './components/AlertButton';
import AlertList from './components/AlertList';
import Header from './components/Header';
import HelpButton from './components/HelpButton';
import HelpPage from './components/HelpPage';
import LinePicker from './components/LinePicker';
import Toggle from './components/Toggle';
import StopList from './components/StopList';
import Footer from './components/Footer';
import DirectionPicker from './components/DirectionPicker';
import * as Colors from './constants/Colors';
import HorizontalLine from './components/HorizontalLine';

const App = () => {
	const SERVER_BASE_URL = 'https://simple-train-tracker-app-server-production.up.railway.app';
	// const SERVER_BASE_URL = 'http://localhost:3000';

	const [selectedLine, setSelectedLine] = useState('Green-E');
	const [selectedTrain, setSelectedTrain] = useState('Green-E');
	const [selectedBus, setSelectedBus] = useState('39');
	const [isTrain, setIsTrain] = useState(true);
	const [isInbound, setIsInbound] = useState(false);

	const [selectedStop, setSelectedStop] = useState();
	const [selectedStopTime, setSelectedStopTime] = useState();

	const [selectedStopTrain, setSelectedStopTrain] = useState({
		name: 'Brigham Circle',
		id: 'place-brmnl',
	});
	const [selectedStopBus, setSelectedStopBus] = useState({
		name: 'Huntington Ave @ Wigglesworth St',
		id: '21317',
	});

	const [lines, setLines] = useState([]);
	const [fetchError, setFetchError] = useState(false);
	const [stopList, setStopList] = useState([]);
	const [lineColor, setLineColor] = useState(Colors.getColorsFromVehicleId('Green-E'));
	const [vehicleLocations, setVehicleLocations] = useState([]);
	const [alerts, setAlerts] = useState([]);
	const [showHelp, setShowHelp] = useState(false);
	const [showAlerts, setShowAlerts] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	const selectedLineRef = useRef(selectedLine);
	useEffect(() => {
		selectedLineRef.current = selectedLine;
	}, [selectedLine]);

	const fetchVehicleList = useCallback(async () => {
		const type = isTrain ? '0,1' : '3';
		const url = `${SERVER_BASE_URL}/routes?filter[type]=${type}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			const allLines = data.data;
			const filteredLines = allLines.filter((line) => line.id !== 'Mattapan');
			setLines(filteredLines.sort((a, b) => a.id - b.id));
			setFetchError(false);
		} catch {
			setFetchError(true);
			setLines([]);
		}
	}, [isTrain, SERVER_BASE_URL]);

	const fetchStopListTrain = useCallback(
		async (lineId, directionId) => {
			if (!lineId) return;
			const url = `${SERVER_BASE_URL}/stops?include=child_stops&filter[route]=${lineId}&filter[direction_id]=1`;
			try {
				const response = await fetch(url);
				const data = await response.json();
				const stops = data.data.map((stop) => ({
					id: stop.id,
					name: stop.attributes.name,
				}));
				setStopList(stops);
				setFetchError(false);
				setVehicleLocations([]);
			} catch {
				setFetchError(true);
				setStopList([]);
			}
		},
		[SERVER_BASE_URL],
	);

	const fetchStopListBus = useCallback(
		async (lineId, directionId) => {
			if (!lineId) return;
			const url = `${SERVER_BASE_URL}/stops/bus?route=${lineId}&direction_id=${directionId}`;
			try {
				const response = await fetch(url);
				const stops = await response.json();
				setStopList(stops);
				setFetchError(false);
				setVehicleLocations([]);
			} catch {
				setFetchError(true);
				setStopList([]);
			}
		},
		[SERVER_BASE_URL],
	);

	const fetchStopNameFromId = useCallback(
		async (stopId) => {
			if (!stopId) return null;
			const url = `${SERVER_BASE_URL}/stops/${stopId}`;
			try {
				const response = await fetch(url);
				const data = await response.json();
				return data.data.attributes.name;
			} catch {
				setFetchError(true);
				return null;
			}
		},
		[SERVER_BASE_URL],
	);

	const fetchTrainLocations = useCallback(async () => {
		const currentLine = isTrain ? selectedTrain : selectedBus;
		const currentDirection = isInbound ? 1 : 0;
		if (!currentLine) return;

		const url = `${SERVER_BASE_URL}/vehicles?filter[route]=${currentLine}&filter[direction_id]=${currentDirection}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			const vehicles = data.data;

			if (vehicles.length > 0) {
				const vehicleLocationsPromises = vehicles.map(async (vehicle) => {
					const stopId = vehicle.relationships.stop.data.id;
					const name = await fetchStopNameFromId(stopId);
					const status = vehicle.attributes.current_status;
					return { stopId, name, status };
				});
				const resolvedLocations = await Promise.all(vehicleLocationsPromises);
				setVehicleLocations(resolvedLocations);
				setFetchError(false);
			} else {
				setVehicleLocations([]);
				setFetchError(false);
			}
		} catch {
			setFetchError(true);
		}
	}, [isTrain, selectedTrain, selectedBus, isInbound, fetchStopNameFromId, SERVER_BASE_URL]);

	const fetchAlerts = useCallback(async () => {
		if (!selectedLine) return;
		const url = `${SERVER_BASE_URL}/alerts?route=${selectedLine}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			setAlerts(data.data);
			setFetchError(false);
		} catch {
			setFetchError(true);
			setAlerts([]);
		}
	}, [selectedLine, SERVER_BASE_URL]);

	const fetchStopTime = useCallback(async () => {
		const url = `${SERVER_BASE_URL}/predictions?route=${selectedLine}&direction_id=${isInbound ? 1 : 0}&stop=${selectedStop.id}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			setSelectedStopTime(data);
		} catch {}
	}, [selectedLine, selectedStop, isInbound, SERVER_BASE_URL]);

	useEffect(() => {
		const loadSavedData = async () => {
			setIsLoading(true);
			try {
				const savedIsTrain = await AsyncStorage.getItem('saved-vehicle-type');
				const savedTrain = await AsyncStorage.getItem('saved-train');
				const savedBus = await AsyncStorage.getItem('saved-bus');
				const savedIsInbound = await AsyncStorage.getItem('saved-direction');

				const initialIsTrain = savedIsTrain !== null ? JSON.parse(savedIsTrain) : true;
				const initialTrain = savedTrain !== null ? savedTrain : 'Green-E';
				const initialBus = savedBus !== null ? savedBus : '39';
				const initialIsInbound =
					savedIsInbound !== null ? JSON.parse(savedIsInbound) : true;

				setIsTrain(initialIsTrain);
				setSelectedTrain(initialTrain);
				setSelectedBus(initialBus);
				setIsInbound(initialIsInbound);

				const calculatedSelectedLine = initialIsTrain ? initialTrain : initialBus;
				setSelectedLine(calculatedSelectedLine);
			} catch {
			} finally {
				setIsLoading(false);
			}
		};

		loadSavedData();
	}, []);

	useEffect(() => {
		if (selectedLine !== null && !isLoading) {
			const saveSelectedLineToStorage = async () => {
				try {
					await AsyncStorage.setItem(isTrain ? 'saved-train' : 'saved-bus', selectedLine);
				} catch {}
			};
			saveSelectedLineToStorage();

			if (isTrain) {
				setSelectedTrain(selectedLine);
			} else {
				setSelectedBus(selectedLine);
			}
		}
	}, [selectedLine, isTrain, isLoading]);

	useEffect(() => {
		if (!isLoading) {
			const saveIsTrainToStorage = async () => {
				try {
					await AsyncStorage.setItem('saved-vehicle-type', JSON.stringify(isTrain));
				} catch {}
			};
			saveIsTrainToStorage();
			fetchVehicleList();
		}
	}, [isTrain, isLoading, fetchVehicleList]);

	useEffect(() => {
		if (!isLoading) {
			const saveIsInboundToStorage = async () => {
				try {
					await AsyncStorage.setItem('saved-direction', JSON.stringify(isInbound));
				} catch {}
			};
			saveIsInboundToStorage();
		}
	}, [isInbound, isLoading]);

	useEffect(() => {
		if (!isLoading && selectedLine !== null) {
			if (isTrain) {
				fetchStopListTrain(selectedLine, 1);
			} else {
				fetchStopListBus(selectedLine, isInbound ? 1 : 0);
			}

			setLineColor(Colors.getColorsFromVehicleId(selectedLine));

			fetchAlerts();
			setShowAlerts(false);
		}
	}, [
		selectedLine,
		isTrain,
		isInbound,
		isLoading,
		fetchStopListTrain,
		fetchStopListBus,
		fetchAlerts,
	]);

	useEffect(() => {
		if (!isLoading && selectedLine !== null) {
			fetchTrainLocations();
			fetchStopTime();
			const interval = setInterval(() => {
				fetchTrainLocations();
				fetchStopTime();
			}, 500); // 2500 original

			return () => {
				clearInterval(interval);
			};
		}
	}, [isLoading, selectedLine, isTrain, isInbound, fetchTrainLocations, fetchStopTime]);

	useEffect(() => {
		setSelectedStop(isTrain ? selectedStopTrain : selectedStopBus);
	}, [isTrain, selectedStopTrain, selectedStopBus]);

	useEffect(() => {
		setSelectedStopTrain({});
	}, [selectedTrain]);

	useEffect(() => {
		setSelectedStopBus({});
	}, [selectedBus]);

	const setSelectedStopVehicle = (data) => {
		if (JSON.stringify(data) === JSON.stringify(selectedStop)) {
			isTrain ? setSelectedStopTrain() : setSelectedStopBus();
			setSelectedStop();
		} else {
			isTrain ? setSelectedStopTrain(data) : setSelectedStopBus(data);
			setSelectedStop(data);
		}
	};

	if (isLoading) {
		return (
			<SafeAreaProvider>
				<SafeAreaView style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text>Loading preferences...</Text>
				</SafeAreaView>
			</SafeAreaProvider>
		);
	}

	if (showHelp) {
		return (
			<SafeAreaProvider>
				<SafeAreaView
					style={[styles.safeArea, { backgroundColor: Colors.helpScreenColors.primary }]}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<HelpButton showHelp={showHelp} toggleHelpFunction={setShowHelp} />
							<Header />
							<AlertButton
								anyAlerts={false}
								showAlerts={showAlerts}
								toggleAlertsButtonFunction={setShowAlerts}
							/>
						</View>
						<HorizontalLine />
						<HelpPage />
						<HorizontalLine />
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		);
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView style={[styles.safeArea, { backgroundColor: lineColor.lighter }]}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<HelpButton showHelp={showHelp} toggleHelpFunction={setShowHelp} />
						<Header />
						<AlertButton
							anyAlerts={alerts.length > 0}
							showAlerts={showAlerts}
							toggleAlertsButtonFunction={setShowAlerts}
						/>
					</View>
					<LinePicker
						selectedLine={selectedLine}
						lineList={lines}
						lineSelectedFunction={setSelectedLine}
					/>
					<View style={styles.optionsContainer}>
						<Toggle
							isTrain={isTrain}
							toggleSetFunction={(val) => {
								setIsTrain(val);
								setSelectedLine(val ? selectedTrain : selectedBus);
							}}
							lineColor={lineColor}
						/>
						<DirectionPicker
							isInbound={isInbound}
							setIsInboundFunction={setIsInbound}
							lineColor={lineColor}
							firstStop={stopList[0] ? stopList[0].name : ''}
							lastStop={
								stopList[stopList.length - 1]
									? stopList[stopList.length - 1].name
									: ''
							}
						/>
					</View>
					<HorizontalLine />
					{showAlerts ? (
						<AlertList alertList={alerts} lineColor={lineColor} />
					) : (
						<StopList
							stopList={stopList}
							vehicleLocations={vehicleLocations}
							lineColor={lineColor}
							selectedStop={selectedStop ? selectedStop : {}}
							selectedStopTime={selectedStopTime ? selectedStopTime : {}}
							setSelectedStopFunction={setSelectedStopVehicle}
						/>
					)}
					<HorizontalLine />
					<Footer isFailing={fetchError} isTrain={isTrain} />
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		zIndex: 1000,
		paddingBottom: 18,
		backgroundColor: 'white',
	},
	optionsContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'space-evenly',
		marginVertical: 5,
	},
});

export default App;
