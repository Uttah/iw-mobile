import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 4,
		borderColor: '#b2b2b2',
    borderWidth: 1
	}
});