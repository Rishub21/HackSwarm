import React from 'react';
import {
    TextInput,
    AsyncStorage,
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import {Keyboard} from '../components/Keyboard';
import {TypeButton} from '../components/TypeButton';


export default class KeyboardScreen extends React.Component {
    constructor(){
	super();
    }

    static navigationOptions = {
	header: null,
    };

    render() {
	return (
	    <View style={styles.container}>
		<ScrollView style={styles.container}
			    contentContainerStyle={styles.contentContainer}
			    bounce={false}
			    alwaysBounceVertical={false}
			    keyboardShouldPersistTaps={'always'}
		>
			<TextInput
			    style={{fontSize: 50, height: 80, borderColor: 'gray', borderWidth: 1, paddingLeft: 2}}
			    defaultValue={this.props.screenProps.currentCode}
			    placeholder={'new line'}
			    onSubmitEditing={(event) => {
				    this.props.screenProps.events.next(
					{
					    action: 'change_line',
					    value: event.nativeEvent.text
					});
			    }}
			    autoCapitalize={'none'}
			    autoFocus={true}
			    blurOnSubmit={false}
			/>
		    <View style={styles.boxrow}>
			<View
			    style={styles.button}>
			    <Button
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'key_arrow_up',
						value: null
					});
				}}
				title={"↑"}
			    />
			</View>
			<View
			    style={styles.button}>			
			    <Button
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'key_arrow_down',
						value: null
					});
				}}
				title={"↓"}
			    />
			</View>
		    </View>
		</ScrollView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    lineNumber: {
	color: 'red'
    },
    currentLine: {
	backgroundColor: "blue"
    },
    boxrow: {
	flexDirection: "row",
	alignItems: 'flex-end'
    },
    button: {
	flex: 1,
	borderColor: 'red',
	borderWidth: 1,
	padding: 10
    },
    container: {
	flex: 1,
	paddingLeft: 2,
	paddingRight: 2,
	backgroundColor: '#fff',
    },
    contentContainer: {
	paddingTop: 30,
    }
});
