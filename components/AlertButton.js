import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AlertButton = ({ showAlerts, toggleAlertsButtonFunction }) => {
	return (
		<Pressable onPress={() => toggleAlertsButtonFunction(!showAlerts)}>
			{showAlerts ? (
				<Ionicons name="close" size={24} color="red" />
			) : (
				<Ionicons name="warning" size={24} color="goldenrod" />
			)}
		</Pressable>
	);
};

export default AlertButton;
