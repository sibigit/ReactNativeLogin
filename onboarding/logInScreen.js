
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  PixelRatio,
  Platform,
  findNodeHandle,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList
} from 'react-native';

import SpinnerButton from '@components/spinner-button';
import TextButton from '@components/text-button';
import { setFetchedOpenSamples } from '../action';
import ListItem from './ListItems';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// const ANDROID_STATUS_BAR_HEIGHT = 25,

const mainLogoWidth = screenHeight/screenWidth > 1.5 ? (screenWidth*6)/10  : (screenWidth/2);
const mainLogoHeight = screenHeight/screenWidth > 1.5 ? (screenWidth*6)/10  : (screenWidth/2);

function getSizeModifier() {
  //return 1;
	var newMod = PixelRatio.get()/2;
	if (newMod > 1) {
		newMod = 1;
	}

	return newMod;
}

class LogInScreen extends Component {

  static propTypes = {
   
    dashboard: PropTypes.array,
   
  }

  constructor(props) {
    super(props);
      this.state = {
        username: '',
        password: '',
        keyboardHeight: 1,
        isLogin: false
      };
  }
  
  fieldFocused = (refName) => {
    this.setState({currentlySelectedField: refName})
    var scrollOffset = 0;
    if (refName === 'usernameInput') {
      scrollOffset=150;
    } else {
      scrollOffset=75.5;
    }
    let scrollResponder = this.refs.scrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      findNodeHandle(this.refs[refName]),
      scrollOffset, //additionalOffset
      true
    );
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  logInPressed(){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(this.state.username) === false){
      Alert.alert("","Enter Valid Email Id")
    }
    else if(this.state.username != this.props.username || this.state.password != this.props.password ) {
      Alert.alert('', 'Invalid UserName or PassWord');
    }
    else{
      this.setState({isLogin:true})
    }
  }

  handleItemClick(index){
    Alert.alert("User Details",JSON.stringify( this.props.dashboard[index]))
  }

render() {
  
  if(this.state.isLogin == false){
    return (
      <View style ={{flex: 1}}>
        <ScrollView
          ref = 'scrollView'
          style = {{marginBottom: this.state.keyboardHeight}}
          keyboardShouldPersistTaps = {'always'}
          contentContainerStyle={{flexGrow: 1, height: Platform.OS === 'ios' ? screenHeight : (screenHeight - 10 )- (25)}}
          alwaysBounceVertical = {false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
          <View style = {{height:(Platform.OS === 'ios') ? 63 : 56 + 1,backgroundColor:'#fff'}}/>
            <View style={styles.mainLogoContainer}>
              <Image
                style={styles.mainLogoSize}
                source={require('@resources/Smile.png')}
              /> 
            </View>

            <View>
              <View style = {styles.textContainer}>
                <View>
                  <Text style = {styles.spencerLeftTitleText}>
                    Email
                  </Text>

                  <View style = {styles.textEntryField}>
                    <TextInput
                      ref = 'usernameInput'
                      style = {styles.textInputHeight}
                      onChange = {(event) => this.setState({username: event.nativeEvent.text})}
                      autoCorrect = {false}
                      keyboardType = {'email-address'}
                      autoCapitalize = {'none'}
                      defaultValue = {this.state.username}
                      onFocus = {() => this.fieldFocused('usernameInput')}
                      onSubmitEditing = {() => this._focusNextField('passInput')}
                      returnKeyType = {'next'}
                      underlineColorAndroid = {'transparent'}
                      />
                  </View>
                </View>

                <View>
                  <Text style = {styles.spencerLeftTitleText}>
                    Password 
                  </Text>
                  <View style = {[styles.textEntryField, {flexDirection: 'row'}]}>
                    <TextInput
                      ref='passInput'
                      style={styles.textInputHeight}
                      defaultValue = {this.state.password}
                      onChange = {(event) => this.setState({password: event.nativeEvent.text})}
                      autoCorrect = {false}
                      keyboardType = 'default'
                      secureTextEntry = {true}
                      onFocus = {() => this.fieldFocused('passInput')}
                      onSubmitEditing = {() => this.logInPressed()}
                      underlineColorAndroid = {'transparent'}
                      returnKeyType = {'done'}
                    />

                    <TextButton
                      style = {styles.invisibleButton}
                      textStyle = {styles.forgottenPasswordText}
                      onPress={() => this._launchForgottenPassword()}
                    >
                      forgot password
                    </TextButton>
                  </View>
                </View>

                <View style = {styles.buttonContainer}>
                    <SpinnerButton
                        disabled = { this.state.username.length === 0 || this.state.password.length === 0}
                        style = {styles.mainButton}
                        textStyle = {styles.buttonText}
                        onPress={() => this.logInPressed()}
                        spinnerColor = '#FFF'
                        >
                       Sign In
                   </SpinnerButton>
              </View>
              <View style={{height:30}}/>
            </View>
          </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  else{
    return (
        <View style={{paddingTop:10,paddingLeft:1,paddingRight:1}}>
          <FlatList
          data={this.props.dashboard}
          renderItem={({ item,index }) => (

            <ListItem
              containerStyle={{ borderBottomWidth: 0 }}
              views={() => this.handleItemClick(index)}
              item={item}
              key={index.toString()}
            />
          )}

          keyExtractor={(item, index) => index}
          onRefresh={this.handleRefresh}
          onEndReachedThreshold={1}
        />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow:      1,
    flexDirection: 'column',
  },
  mainLogoContainer: {
    flex:            1,
    backgroundColor: '#fff'
  },
  mainLogoSize: {
    width:     mainLogoWidth/1.15,
    height:    mainLogoHeight/1.15,
    alignSelf: 'center'
  },
  textContainer: {
    backgroundColor: '#fff'
  },
  spencerLeftTitleText: {
    textAlign:  'left',
    color:      '#4D8FC9',
    marginLeft: 15,
    paddingTop: 10,
    fontSize:   Math.floor(16 * getSizeModifier()),
  },
  textEntryField: {
      borderBottomColor: '#B3B3B3',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      width: '90%',
      alignSelf: 'center'
    },
    textInputHeight: {
      height: 44, //(Platform.OS === 'ios') ? (SPENCER_CONSTANTS.SCREEN_HEIGHT > 600 ? 44 : 40) : 44,
      flexGrow: 1,
      fontSize:  Math.floor(18 * getSizeModifier()),
      color: 'rgba(89, 90, 89, 1)',
    },
    forgottenPasswordText: {
      textAlign:     'right',
      color:         '#6CBE66',
      fontSize:       Math.floor(14 * getSizeModifier()),
      fontWeight:    'bold',
      paddingTop:    10,
      paddingBottom: 10
    },
    invisibleButton: {
      height:          44,
      overflow:        'hidden',
      backgroundColor: 'transparent'
    },
    buttonContainer: {
      marginTop:  10,
      paddingTop: 10 
    },
    mainButton: {
      height: 44,
      width: '90%',
      justifyContent: 'center',
      overflow: 'hidden',
      alignSelf: 'center',
      backgroundColor: '#6CBE66',
      ...Platform.select({
        ios: {
          borderRadius: 5
        },
        android: {
          borderRadius: 0
        }
      })
    },
    buttonText: {
      fontSize:          Math.floor(14 * getSizeModifier()),
      fontWeight:        'bold',
      textAlign:         'center',
      textAlignVertical: 'center',
      color:             '#fff'
    },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard ,
    username: state.username ,
    password: state.password ,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFetchedOpenSamples: (dashboard) => dispatch(setFetchedOpenSamples(dashboard))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);