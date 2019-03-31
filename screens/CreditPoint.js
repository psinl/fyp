import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import firebase from 'react-native-firebase';

import {Input} from '../components/Input';
import {Buttons} from '../components/Button';

export default class CreditPoint extends React.Component {
  constructor(){
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      email:'',
      point:'0',
      user:'',
    }
  }

creditPoint = () => {
  this.ref.where('email','==',this.state.email).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.id);
      this.setState({
        user:doc.id
      })
      console.log(this.state.user)
    })
  })
  .then(()=>{
    this.ref.doc(this.state.user).set({
      email:this.state.email,
      point:parseInt(this.state.point)
    })
    Alert.alert('Point credited successfully')
    this.props.navigation.goBack();
    console.log(this.state.user)
    console.log(this.state.point)
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    this.setState({
      isLoading: false,
    });
  });
}
render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Credit Point</Text>
          <Input
            placeholder='Enter user email...'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <Input
            placeholder='Enter credit point...'
            label='Point'
            onChangeText={point => this.setState({point})}
            value={this.state.point}
          />
          <Buttons onPress={()=>this.creditPoint()}>Credit Point</Buttons>

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
