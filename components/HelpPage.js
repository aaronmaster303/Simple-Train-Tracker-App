import { Text, StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../constants/Colors';

const HelpPage = () => {
	return (
		<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
			<View style={styles.overallDescription}>
				<Text style={styles.overallHeading}>Welcome to the MBTA Train & Bus Tracker! </Text>
				<Text style={styles.overallText}>
					Stay connected to Boston’s public transit system with real-time train and bus
					tracking. Here’s how to get the most accurate, live information ↓
				</Text>
			</View>

			{/* --- Select a Line --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="train" size={22} color="orange" />
					<Text style={styles.header}>Select a Line</Text>
				</View>
				<Text style={styles.mainText}>
					Use the scroll wheel on the main screen to choose a train or bus line. Each line
					shows live MBTA vehicle data for that route.
				</Text>
			</View>

			{/* --- Train or Bus Mode --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="swap-horizontal" size={22} color="purple" />
					<Text style={styles.header}>Train or Bus Mode</Text>
				</View>
				<Text style={styles.mainText}>
					Use the toggle switch at the top of the screen to switch between train and bus
					tracking. Your most recently selected line in each mode will be saved
					automatically.
				</Text>
			</View>

			{/* --- Choose a Direction --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="swap-vertical" size={22} color="purple" />
					<Text style={styles.header}>Choose a Direction</Text>
				</View>
				<Text style={styles.mainText}>
					After selecting a line, choose the direction of travel. The arrow icon indicates
					which way the vehicles are moving in the stop list.
				</Text>
			</View>

			{/* --- Live Vehicle Tracking --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="location" size={22} color="green" />
					<Text style={styles.header}>Live Vehicle Tracking</Text>
				</View>
				<Text style={styles.mainText}>
					All vehicles shown on the map are live-updating. You’ll see trains and buses
					move in real time as they travel along their routes.
				</Text>
			</View>

			{/* --- Check Arrival Times --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="time" size={22} color="#2E86DE" />
					<Text style={styles.header}>Check Arrival Times</Text>
				</View>
				<Text style={styles.mainText}>
					To view upcoming arrivals for a specific stop, hold down (long-press) on a stop
					in the stop list to instantly see the arrival time of the nearest train or bus.
				</Text>
				<Text style={styles.note}>
					Note: Due to MBTA data restrictions, you can track only one train line and one
					bus line at a time.
				</Text>
			</View>

			{/* --- Service Alerts --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="warning" size={22} color="#E8B923" />
					<Text style={styles.header}>Service Alerts</Text>
				</View>
				<Text style={styles.mainText}>
					If there are active MBTA alerts for your selected line, a warning icon appears
					in the top-right corner. Tap it to view delay notifications and service updates.
				</Text>
			</View>

			{/* --- Saved Preferences --- */}
			<View style={styles.section}>
				<View style={styles.headerRow}>
					<Ionicons name="save" size={22} color="dimgray" />
					<Text style={styles.header}>Saved Preferences</Text>
				</View>
				<Text style={styles.mainText}>
					The app automatically remembers your last selected train and bus so you can
					quickly check your preferred routes the next time you open it.
				</Text>
			</View>

			<Text style={styles.disclaimer}>
				Disclaimer: All transit data in this app is provided directly by the MBTA. While
				every effort is made to display accurate and up-to-date information, the developer
				is not responsible for any errors, delays, or discrepancies in the data.
			</Text>

			<View style={styles.footerView}>
				<Text
					style={styles.privacyPolicyLink}
					onPress={() =>
						Linking.openURL(
							'https://aaronmaster303.github.io/MBTA-Train-Bus-Tracker-Privacy-Policy/',
						)
					}>
					Privacy Policy
				</Text>
				<Text style={styles.copyright}>© 2025 Aaron Master. All rights reserved.</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	footerView: {
		display: 'flex',
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	privacyPolicyLink: { color: 'blue', fontSize: 12 },
	copyright: { color: 'dimgray', fontSize: 12 },
	scrollView: {
		backgroundColor: Colors.helpScreenColors.background,
	},
	scrollContent: {
		paddingHorizontal: 4,
		paddingTop: 30,
		paddingBottom: 10,
	},
	overallDescription: {
		marginBottom: 40,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
		gap: 8,
	},
	header: {
		fontSize: 20,
		fontWeight: '600',
		color: Colors.helpScreenColors.headerText,
	},
	mainText: {
		fontSize: 16,
		color: Colors.helpScreenColors.bodyText,
		lineHeight: 22,
		marginBottom: 6,
		textAlign: 'justify',
	},
	overallHeading: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.helpScreenColors.headerText,
		textAlign: 'center',
		marginBottom: 10,
	},
	overallText: {
		fontSize: 17,
		color: Colors.helpScreenColors.headerText,
		lineHeight: 22,
		textAlign: 'center',
		marginBottom: 30,
	},
	note: {
		fontSize: 13,
		color: Colors.helpScreenColors.noteText,
		fontStyle: 'italic',
		marginTop: 4,
		marginBottom: 6,
		textAlign: 'center',
	},
	disclaimer: {
		fontSize: 14,
		color: Colors.helpScreenColors.noteText,
		fontStyle: 'italic',
		marginTop: 40,
		textAlign: 'center',
	},
	section: {
		marginBottom: 26,
	},
});

export default HelpPage;
