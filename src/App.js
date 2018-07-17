import React, { Component } from 'react';
import './App.css';
import { Stage, Layer, Text } from 'react-konva';
import firebase from './config/firebase.js';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      username: '',
      users: []
    }

    this._firebaseUsers = firebase.database().ref('/users');
    this._firebaseCallback = null;
  }

  componentDidMount() {
    this._firebaseCallback = this._firebaseUsers.on('value', snap => {
      const users = snap.val();
      console.log('firebaseUsers snap', users );

      this.setState({
        users
      });
    });
  }
  
  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  render() {
    const {users} = this.state;

console.log('render users', users);

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
              <Text
                text="headline"
                fill="000000"
                x={10}
                y={10}                
              />
        </Layer>
        <Layer>

          {users.map((item) => {
            return (
              <Text
                text={item.nick}
                name="text"
                fill={item.color}
                x={item.position.x}
                y={item.position.y}
                draggable
                onDragEnd={this.handleThirdDragEnd}
              />
            );
          })}          
        </Layer>
      </Stage>
    );
  }
}

export default App;
