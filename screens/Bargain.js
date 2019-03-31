import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  Text,
  Button,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import {InputWithLabel, AppButton} from '../components/UI';

import DateTimePicker from 'react-native-modal-datetime-picker';

Date.prototype.formatted = function() {
  let hour = this.getHours();
  var minute = this.getMinutes();
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  hour = hour < 10 ? '0'+hour : hour;

  minute = minute < 10 ? '0'+minute : minute;

  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year},${hour}${minute}`;
}

export default class Bargain extends React.Component {
  static navigationOptions = {
    title:'Decide Date and Place'
  };

  constructor(props){
    super(props);
    const {navigation} = this.props
    this.state = {
      place:'',
      datetime:'',
      dateTimePickerVisible:false,
      bargain:JSON.parse(navigation.getParam('bargainStatus')),
      lastEditing:''

    }

    this.ref = firebase.firestore().collection('bargains');
    this.offerRef = firebase.firestore().collection('offers').doc(JSON.parse(navigation.getParam('offerkey')))
    this.bargainRef = firebase.firestore().collection('bargains').doc(JSON.parse(navigation.getParam('bargainId')));
  }

  componentDidMount(){
    this.bargainRef.get().then((doc) => {
      if (doc.exists) {
        const bargain = doc.data();
        this.setState({
          place:bargain.place,
          lastEditing:bargain.lastEditing,
          datetime:bargain.datetime
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  saveBargains() {
    if(this.state.datetime != '' && this.state.place != ''){
      this.ref.add({
        place:this.state.place,
        datetime:this.state.datetime,
        lastEditing:firebase.auth().currentUser.email
      }).then((docRef) => {
        this.offerRef.update({
          bargainId:docRef.id,
          bargainStatus:'start'
        })
      })
    }else{
      Alert.alert('Please fill in all fields')
    }
  }

  acceptBargain(){
    this.offerRef.update({
      status:'Complete',
      bargainStatus:'end'
    })
  }

  editBargain(){
    this.bargainRef.update({
      lastEditing:firebase.auth().currentUser.email,
      place:this.state.place,
      datetime:this.state.datetime
    })
  }
  showDateTimePicker = () => this.setState({ dateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ dateTimePickerVisible: false });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
    this.setState({datetime: date.getTime()})
  };

  render() {
    if(this.state.bargain == 'no status' ){
      return (
        <ScrollView style={styles.container}>
            <InputWithLabel style={styles.input}
              label={'Place'}
              value={this.state.place}
              onChangeText={(place) => {this.setState({place})}}
              orientation={'vertical'}
            />
            <InputWithLabel style={styles.input}
              label={'Date and Time'}
              value={new Date(this.state.datetime).formatted()}
              orientation={'vertical'}
              editable = {false}
            />
            <TouchableOpacity  onPress={this.showDateTimePicker}>
             <Text>Show Date and Time Picker</Text>
           </TouchableOpacity>
           <DateTimePicker style={styles.picker}
             mode = "datetime"
             isVisible={this.state.dateTimePickerVisible}
             onConfirm={this.handleDatePicked}
             onCancel={this.hideDateTimePicker}
           />

           <View style={styles.subContainer}>
             <Button
               large
               title='Save'
               onPress={() => this.saveBargains()} />
           </View>
        </ScrollView>
      );
    }else if (this.state.bargain == 'start' &&
      this.state.lastEditing != firebase.auth().currentUser.email){
      return (
        <ScrollView style={styles.container}>
            <InputWithLabel style={styles.input}
              label={'Place'}
              value={this.state.place}
              onChangeText={(place) => {this.setState({place})}}
              orientation={'vertical'}
            />
            <InputWithLabel style={styles.input}
              label={'Date and Time'}
              value={new Date(this.state.datetime).formatted()}
              orientation={'vertical'}
              editable = {false}
            />
            <TouchableOpacity  onPress={this.showDateTimePicker}>
             <Text>Show Date and Time Picker</Text>
           </TouchableOpacity>
           <DateTimePicker style={styles.picker}
             mode = "datetime"
             isVisible={this.state.dateTimePickerVisible}
             onConfirm={this.handleDatePicked}
             onCancel={this.hideDateTimePicker}
           />

            <View style={styles.subContainer}>
              <Button
                large
                title='Edit'
                onPress={() => this.editBargain()}
              />
            </View>
            <View style={styles.subContainer}>
              <Button
                large
                title='Accept'
                onPress={() => this.acceptBargain()}
               />
            </View>
        </ScrollView>
      );
    }else if (this.state.bargain == 'start' &&
      this.state.lastEditing == firebase.auth().currentUser.email){
      return (
        <ScrollView style={styles.container}>
            <InputWithLabel style={styles.input}
              label={'Place'}
              value={this.state.place}
              onChangeText={(place) => {this.setState({place})}}
              orientation={'vertical'}
              editable = {true}
            />
            <InputWithLabel style={styles.input}
              label={'Date and Time'}
              value={new Date(this.state.datetime).formatted()}
              orientation={'vertical'}
              editable = {false}
            />
            <TouchableOpacity  onPress={this.showDateTimePicker}>
             <Text>Show Date and Time Picker</Text>
           </TouchableOpacity>
           <DateTimePicker style={styles.picker}
             mode = "datetime"
             isVisible={this.state.dateTimePickerVisible}
             onConfirm={this.handleDatePicked}
             onCancel={this.hideDateTimePicker}
           />

            <View style={styles.subContainer}>
              <Button
                large
                title='Edit'
                onPress={() => this.editBargain()}
              />
            </View>
        </ScrollView>
      );
    }else if(this.state.bargain == 'Complete' ){
      return (
        <ScrollView style={styles.container}>
            <InputWithLabel style={styles.input}
              label={'Place'}
              value={this.state.place}
              onChangeText={(place) => {this.setState({place})}}
              orientation={'vertical'}
              editable = {false}
            />
            <InputWithLabel style={styles.input}
              label={'Date and Time'}
              value={new Date(this.state.datetime).formatted()}
              orientation={'vertical'}
              editable = {false}
            />
            
        </ScrollView>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});
