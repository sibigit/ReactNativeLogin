'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

class TextButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
        underlayColor={'transparent'}>
          <Text style={[styles.buttonText,this.props.textStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center'
  }
});

export default TextButton
