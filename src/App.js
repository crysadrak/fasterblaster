import React, { Component } from 'react';
import './App.css';
import { Stage, Layer, Text } from 'react-konva';
import Blaster from './component/Blaster.jsx'
import firebase from './config/firebase.js';

class App extends Component {

/* ================================================================================== */
  constructor() {
    super();

    this.state = {
      appStatus: 'init',
      username: '',
      users: []
    }

    this._firebaseAuth = firebase.auth().signInAnonymously().catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('signInAnonymously failed', errorCode, errorMessage);
    });

    this._firebaseDatabase = firebase.database();

    this._firebaseCallback = null;
  }

/* ================================================================================== */
  componentDidMount() {
      this.setState({
        appStatus: 'loading...'
      });

    this._firebaseCallback = this._firebaseDatabase.ref('users').on('value', snapshot => {
      let users = [];

      snapshot.forEach(function(childSnapshot) {
        const userData = childSnapshot.val();
        userData.key = childSnapshot.key;

        users.push(userData);
      });

      this.setState({
        appStatus: 'users loaded',
        users
      });

    }, error => {
      console.error('_firebaseDatabase error', error);
      this.setState({
        appStatus: 'users loading error'
      });
    });
  }

/* ================================================================================== */
  componentWillUnmount() {
    this._firebaseDatabase.ref('users').off('value', this._firebaseCallback);
  }

/* ================================================================================== */

  render() {
    const {users, appStatus} = this.state;

console.log('render users', users);

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text={`status: ${appStatus}`}
            fill="000000"
            x={10}
            y={10}
          />
        </Layer>
        <Layer>

          {users && users.map((item) => {
            console.log(item);
            return (
              <Blaster
                nick={item.nick}
                key={item.key}
                passkey={item.key}
                color={item.color}
                x={item.x}
                y={item.y}
                onDragEnd={this._handleDragEnd}
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
/* ================================================================================== */
  _handleDragEnd(event) {
    console.log('App _handleDragEnd', event.target, event.target.x(), this.state);

  }
}

export default App;
