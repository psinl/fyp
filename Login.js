import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

import {Input} from './components/Input';
import {Buttons} from './components/Button';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    if(this.state.email != '' && this.state.password != ''){
      firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({errorMessage:error.message}))
      console.log('handleLogin')
    }else{
      this.setState({errorMessage:'Please enter email and password to login'});
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Login')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Login Page</Text>
          <Input
            placeholder='Enter your email...'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <Input
            placeholder='Enter your password...'
            label='Password'
            secureTextEntry
            onChangeText={password => this.setState({password})}
            value={this.state.password}
          />
          <Buttons onPress={()=>this.handleLogin()}>Log In</Buttons>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  form:{
    flex:1
  },
  heading:{
    fontSize:25,
    textAlign:'center',
    color:'#000'

  }
})
