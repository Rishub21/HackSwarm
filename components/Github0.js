import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Dimensions
} from 'react-native';

var axios = require('axios');
var base64 = require('base-64');

// GLOBAL VARS
BASEURL = 'https://api.github.com';
NAME = 'facetestbook10';

let exampleData = {
  name: NAME,
  description: 'This is your repository',
  homepage: 'https://github.com',
  private: false,
  has_issues: true,
  has_projects: true,
  has_wiki: true,
  auto_init: true
};

let exampleData2 = {
  githubRepoName: NAME,
  githubFileName: 'index.html',
  message: 'A simple commit message',
  committer: {
    name: 'Some Cool guy',
    email: 'winning@nyu.edu'
  },
  content: base64.encode('#hello world!\n<h2>Testing 123</h2>\t<p>you are flat!</p>')
};

let exampleData3 = {
  githubRepoName: NAME,
  githubFileName: 'style.css',
  message: 'A simple commit message',
  committer: {
    name: 'Some Cool guy',
    email: 'winning@nyu.edu'
  },
  content: base64.encode('h1 {color:red}')
};

export class Github extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      NewBoard: '',
      FinalBoard: 'not ready'
    };
  }

  render() {
    return (< View > <TextInput style = {
      {
        height: 40
      }
    }
    placeholder = "Type Github Username" onChangeText = {
      (text) => this.saveData(text)
    } /> <Button onPress {() => {
          axios.all([
            this.createRepo(this.state.myKey, "vishnu21", exampleData),
            this.addFile(this.state.myKey, "vishnu21", exampleData2),
            this.addFile(this.state.myKey, "vishnu21", exampleData3)
          ])
        }
      } title={'Push to github'}
      /> < Text > {
      JSON.stringify(this.state.error)
    } < /Text> </View >)
  }

  getRepos(username) {

    let url = BASEURL + '/user';
    let configs = {
      'Access-Control-Allow-Origin': '*'
    };
    axios.get(url, configs).then(res => {

      alert(1);
    }).catch((error) => {
      if (error.response) {
        this.setState({error: error.response.data});
        console.log(error.response.data);
      } else if (error.request) {
        this.setState({error: error.request});
        console.log(error.request);
      } else {
        this.setState({error: error.message});
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };

  createRepo(username, password, data) {
    console.log('Creating repo...');
    let url = BASEURL + '/user/repos';
    const token = `${username}:${password}`;
    const hash = base64.encode(token);
    const basicAuth = 'Basic ' + hash;
    let configs = {
      'Access-Control-Allow-Origin': '*',
      headers: {
        Authorization: basicAuth
      }
    };
    axios.post(url, data, configs).then(res => {

      console.log(res.status);
    }).catch((error) => {
      this.setState({error: error.response.data});
      alert(url);
      console.log(url)
    });
  };

  addFile(username, password, data) {
    console.log('Addding file to repo...');
    let url = BASEURL + '/repos/' + username + '/' + data.githubRepoName + '/contents/' + data.githubFileName;
    const token = `${username}:${password}`;
    const hash = base64.encode(token);
    const basicAuth = 'Basic ' + hash;
    let configs = {
      'Access-Control-Allow-Origin': '*',
      headers: {
        Authorization: basicAuth
      }
    };
    axios.put(url, data, configs).then(res => {
      console.log(res.status);
      alert(1);
    }).catch((error) => {
      this.setState({error: error.response.data});
      alert(url);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };

  saveData(value) {
    this.setState({"myKey": value});
  }

}
