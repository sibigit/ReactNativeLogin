'use strict'

import React, { Component } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class SpinnerButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var colorStyle;

    var spencerGrey = '#ACB8BE'

    colorStyle=(this.props.spinnerColor ? this.props.spinnerColor : spencerGrey);

    var buttonStyles = [styles.button, this.props.style];
    if (this.props.disabled && !this.props.animating) {
      buttonStyles.push(styles.buttonDisabled);
    }
      return (
        <TouchableHighlight
          disabled={this.props.disabled}
          onPress={this.props.onPress}
          style={buttonStyles}
          underlayColor='#a9d9d4'>

          {(() => {
            if (this.props.animating) {
              return (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator animating={true} size='small' color = {this.props.spinnerColor ? this.props.spinnerColor : spencerGrey} />
                </View>
              )
            } else {
              return (
                <Text style={[styles.buttonText,this.props.textStyle]}>
                  {this.props.children}
                </Text>
              )
            }
          })()}
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
    alignItems: 'center',
    overflow: 'hidden'
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'stretch'
  },
  spinnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SpinnerButton
