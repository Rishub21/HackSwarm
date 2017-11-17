import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage, StyleSheet, Dimensions} from 'react-native';

let stringer = "";
let data = {string: ''};

export class TypeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      NewBoard: '',
      FinalBoard : 'not ready',
    };
  }

  render(){
    return(
    <View>
      <Button
        style = {styles.textbox}
        onPress = {() => {
          //AsyncStorage.setItem("KeyBoard2", "A");
            const current = this.state.NewBoard;
            const newLetter = this.props.letter;
            const isCap = this.props.isCap;

            data.string = data.string + newLetter;

            this.props.onPress(newLetter);
          }
        }
        title = {this.props.letter}
      />

    </View>
    )
  }
}


const styles  = StyleSheet.create({
  boxrow: {
    flexDirection: "row",

  },

  container : {
    flex : 1,
    flexDirection : "row",
    flexWrap : "wrap",
    padding : 2,
  },
  box : {
    flex : 1,
    justifyContent : "space-between",
    //width : Dimensions.get('window').width,

  },

  textbox : {
    width : Dimensions.get('window').width / 10
  }
});
