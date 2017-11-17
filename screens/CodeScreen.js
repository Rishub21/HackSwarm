import React from 'react';
import {
    AsyncStorage,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import * as Rx from "rxjs/Rx";

export default class HomeScreen extends React.Component {
    constructor(){
	super();
	this.state = {
	    code: [
		"At school, they instruct us to look up",
		"and watch the Cuban-cursed sky.",
		"Search for a streak of light.",
		"Listen for a piercing shriek,",
		"the whistle that will warn us",
		"as poisonous A-bombs",
		"zoom close."
	    ],
	    currentLine: 1
	};

	var source = Rx.Observable.from(["key_down", "key_down","key_up", "key_down","key_down", "key_down"]).zip(
	    Rx.Observable.interval(1000),
	    function(a, b){
		return a;
	    }
	);

	var subscription = source.subscribe(
	    event => {
		switch(event){
		    case "key_up":
			this.setState({currentLine: this.state.currentLine - 1});
			break;
		    case "key_down":
			this.setState({currentLine: this.state.currentLine + 1});
			break;
		}
	    },
	    e => console.log('onError: %s', e),
	    () => console.log('onCompleted'));
    }

    static navigationOptions = {
	header: null,
    };

    render() {	
	var x = this.state.code.map((line, number) => {
	    return <Text key={number} style={number == this.state.currentLine ? styles.currentLine : null}>
		<Text style={styles.lineNumber}>{number + 1}: </Text>
		<Text>{line}</Text>
	    </Text>;
	})
	return (
	    <View style={styles.container}>
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		    {x}
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
      container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  }
});
