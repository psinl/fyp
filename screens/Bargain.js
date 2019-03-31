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
  TextInput
} from 'react-native';
import firebase from 'react-native-firebase';
import {InputWithLabel} from '../components/UI';

//import DateTimePicker from 'react-native-modal-datetime-picker';

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

  constructor(){
    super();

    this.state = {
      place:'',
      datetime:'',
      dateTimePickerVisible:false
    }
  }
}
