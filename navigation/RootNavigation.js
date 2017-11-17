import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import * as Rx from "rxjs/Rx";

import {Subject} from "rxjs/Subject";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    code: [
		"<Text>",
		"<h1>",
		"Hello world",
		"</h1>",
		"</Text>"
	    ],
	    currentCode: "<Text>",
	    currentLine: 1
	};
    }
    
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

    render() {
	var events = new Subject();
	events.subscribe((event) => {
	    var newNumber;
	    switch(event.action){
		case "key_arrow_up":
		    newNumber = this.state.currentLine == 1 ? 1 : this.state.currentLine - 1;
		    break;
		case "key_arrow_down":
		    newNumber = this.state.currentLine == this.state.code.length + 1 ? this.state.code.length + 1 : this.state.currentLine + 1;
		    break;
		case "change_line":
		    let code = this.state.code;
		    code[this.state.currentLine - 1] = event.value;
		    this.setState({code: code});
		    break;
	    }
	    if(event.action == "key_arrow_up" || event.action == "key_arrow_down"){
		var newCode = this.state.code[newNumber - 1];
		this.setState({currentLine: newNumber,
			       currentCode: newCode
		});
	    }

	});
	return <RootStackNavigator screenProps={{events: events,
						 code: this.state.code,
						 currentLine: this.state.currentLine,
						 currentCode: this.state.currentCode
	}} />;
    }
    
  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
