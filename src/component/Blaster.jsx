import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
import firebase from '../config/firebase.js';

export default class Blaster extends Component {

	static get propTypes() {
		return {
			nick: PropTypes.string,
			key: PropTypes.string,
			color: PropTypes.string,
			x: PropTypes.number,
			y: PropTypes.number
		};
	}

	static get defaultProps() {
		return {
			nick: '',
			key: '',
			color: '',
			x: 0,
			y: 0
		};
	}

	constructor() {
		super();

		this._myBoundHandleDragEnd = this._handleDragEnd.bind(this);
	}	

	render() {
		console.log('Blaster render', this.props);
      return (<Text
        text={this.props.nick}
        key={this.props.passkey}
        fill={this.props.color}
        x={this.props.x}
        y={this.props.y}
        draggable
        onDragEnd={this._myBoundHandleDragEnd}
      />);
	}

  _handleDragEnd(event) {
    console.log('Blaster _handleDragEnd', event.target, this.props.passkey);

    this._firebaseAuth = firebase.auth().signInAnonymously().catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('signInAnonymously failed', errorCode, errorMessage);
    });

    this._firebaseCallback = firebase.database().ref('users/'+ this.props.passkey).set({
    	nick: this.props.nick,
    	color: this.props.color,
    	key: this.props.passkey,
    	x: event.target.x(),
    	y: event.target.y()
    });
  }
}
