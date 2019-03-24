import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

import {Input} from '../components/Input';
import {Buttons} from '../components/Button';

export default class SignUp extends React.Component {
  constructor(){
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      email:'',
      password:'',
      errorMessage:null,
      point:0
    }
  }

handleSignUp = () => {
  if(this.state.email != '' && this.state.password != ''){
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>this.props.navigation.navigate('Main'))
      .catch(error => this.setState({errorMessage: error.message}))
    console.log('handleSignUp')
    this.ref.add({
      email:this.state.email,
      point:this.state.point
    }).then((docRef)=>{
      this.setState({
        email:'',
        password:''
      })
    })

  }else{
    this.setState({errorMessage:'Please enter email and password to login'});
  }
}
render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>SignUp Page</Text>
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
          <Buttons onPress={()=>this.handleSignUp()}>Sign Up</Buttons>
          <Buttons onPress={()=>{this.props.navigation.navigate('Login')}}>
           Already have an account? Login now</Buttons>
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
