/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import LogInScreen from './onboarding/logInScreen'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

const store = createStore(reducer);


class App extends Component {
render() {
    return (
      <Provider store={store} >
        <LogInScreen />
      </Provider>
    )
  }
}



export default App