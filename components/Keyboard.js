import React from 'react';
import { Button, Dimensions, StyleSheet, Text, View , Alert} from 'react-native';
import {TypeButton} from './TypeButton';
import {SpaceButton} from './SpaceButton';
import {DeleteButton} from './DeleteButton';


let stringer = "";
let data = {string: ''};

export class Keyboard extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    NewBoard: '',
	    FinalBoard : 'not ready',
	    IsCaps : false,
	    IsNumber : false,
	};
    }

    _onPress = (newLetter) => {
      data.string = data.string + newLetter;

	     this.setState(this.state);
    }
    _spaceonPress = (newLetter) => {
      data.string = data.string + newLetter;

	     this.setState(this.state);
    }
    _deleteonPress = (newLetter) => {
      data.string = data.string.slice(0,-1);

	     this.setState(this.state);
    }


    render() {
	var numerals = ["1","2","3","4","5","6","7","8","9","0"];

	var lower_buttons0 = ["q", "w", "e", "r","t", "y", "u", "i", "o", "p", "{", "}", "+", "=", "-"];
	var lower_buttons1 = ["a", "s", "d", "f","g", "h", "j", "k", "l", ":", '"',";" ,  "<", ">"];
	var lower_buttons2 = ["z", "x", "c", "v","b", "n", "m", ",", ".", "?"];

	var upper_buttons0 = ["Q", "W", "E", "R","T", "Y", "U", "I", "O", "P","{", "}", "+", "=", "-"];
	var upper_buttons1 = ["A", "S", "D", "F","G", "H", "J", "K", "L",":", '"',";", "<", ">"];
	var upper_buttons2 = ["Z", "X", "C", "V","B", "N", "M", ",", ".", "?"];

	var number = numerals.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})
	var lb0= lower_buttons0.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})
	var lb1= lower_buttons1.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})
	var lb2= lower_buttons2.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})


	var ub0= upper_buttons0.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})
	var ub1= upper_buttons1.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})
	var ub2= upper_buttons2.map((letter) => {
	    return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
	})

	if(this.state.IsNumber){
	    element = <View style = {styles.box}>
		<View style = {styles.boxrow}>
		    {number}
		</View>
	    </View>

	}


	if(this.state.IsCaps && !this.state.IsNumber){
	    element = <View style = {styles.box}>
		<View style = {styles.boxrow}>
		    {ub0}
		</View>
		<View style = {styles.boxrow}>
		    {ub1}
		</View>
		<View style = {styles.boxrow}>
		    {ub2}
		    <Button
			style = {styles.textbox}
			onPress = {() => {
				//AsyncStorage.setItem("KeyBoard2", "A");
			}
			}
			title = {"←"}
		    />
		    <Button
			style = {styles.textbox}
				onPress = {() => {
					this.props.events.next('key_arrow_up');
			}
			}
			title = {" ↑ "}
		    />
		    <Button
			style = {styles.textbox}
			onPress = {() => {
				//AsyncStorage.setItem("KeyBoard2", "A");
			}
			}
			title = {"→ "}
		    />
		    <Button
			style = {styles.textbox}
			onPress = {() => {
					this.props.events.next('key_arrow_down');
			}
			}
			title = {"↓"}
		    />

		</View>

		<View style = {styles.boxrow}>
		    {number}
		</View>
	    </View>;
	}

	else if (!this.state.IsCaps && !this.state.IsNumber){
	    element = <View style = {styles.box}>
		<View style = {styles.boxrow}>
		    {lb0}
		</View>
		<View style = {styles.boxrow}>
		    {lb1}
		</View>
		<View style = {styles.boxrow}>
		    {lb2}
		    <Button
			style = {styles.textbox}
			onPress = {() => {
				//AsyncStorage.setItem("KeyBoard2", "A");
			}
			}
			title = {"←"}
		    />
		    <Button
			style = {styles.textbox}
			onPress = {() => {
				//AsyncStorage.setItem("KeyBoard2", "A");
				this.props.events.next('key_arrow_up');

			}
			}
			title = {" ↑ "}
		    />
		    <Button
			style = {styles.textbox}
			onPress = {() => {
				//AsyncStorage.setItem("KeyBoard2", "A");
			}
			}
			title = {"→"}
		    />
		    <Button
			style = {styles.textbox}
				onPress = {() => {
					this.props.events.next('key_arrow_down');

			}
			}
			title = {"↓"}
		    />
		</View>
		<View style = {styles.boxrow}>
		    {number}
		</View>
	    </View>;
	}
    return (


    <View>

    <Text> {data.string} </Text>

      {element}
      <View style = {styles.boxrow}>
      <Button
        onPress = {() => {
            currentBool = this.state.IsCaps;
            this.setState({"IsCaps": !currentBool});
          }
        }
        title = "CAPS"
      />

      <SpaceButton onPress={this._spaceonPress}/>
      <DeleteButton onPress={this._deleteonPress}/>
      </View>




    </View>
    );
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
