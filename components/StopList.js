import { StyleSheet } from 'react-native';
import { ScrollView, View } from 'react-native';
import Stop from './Stop';

const StopList = ({ stopList, vehicleLocations, lineColor, selectedStop, selectedStopTime }) => {
	const map = new Map();

	if (stopList.length) {
		stopList.forEach((item) => map.set(item.name, { name: item.name }));
	}

	vehicleLocations?.forEach((item) => {
		if (map.has(item.name)) {
			map.set(item.name, { ...map.get(item.name), status: item.status });
		} else {
			map.set(item.name, { name: item.name, status: item.status });
		}
	});

	const finalStopList = Array.from(map.values());

	return (
		<View style={styles.viewContainer}>
			<ScrollView style={styles.scrollViewContainer} horizontal={false}>
				{finalStopList.map((stop, index) => (
					<Stop
						key={index}
						name={stop.name}
						lineColor={lineColor}
						status={stop.status}
						stopTime={stop.name === selectedStop.name ? selectedStopTime : {}}
					/>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	scrollViewContainer: {
		flex: 1,
	},
});

export default StopList;
