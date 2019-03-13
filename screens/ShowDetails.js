import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Image, Text } from 'react-native';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {
  static navigationOptions = {
    title: 'Item Details',
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      item: {},
      key: ''
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('items').doc(JSON.parse(navigation.getParam('itemkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          item: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Image source={{uri:this.state.item.url}}
          style={{width:'100%',height:200}}/>
        <View style={styles.subContainer}>
          <Text>{ this.state.item.name }</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>{ this.state.item.category }</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>{this.state.item.point} points</Text>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
})
