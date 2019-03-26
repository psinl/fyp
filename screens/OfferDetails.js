import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  Text,
  Button,
  Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import {InputWithLabel} from '../components/UI';


export default class OfferDetails extends React.Component {
  static navigationOptions = {
    title: 'Offer Details',
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      offer: {},
      key: '',
      item:{},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('offers').doc(JSON.parse(navigation.getParam('offerkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          offer: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
    const itemRef = firebase.firestore().collection('items').doc(JSON.parse(navigation.getParam('itemkey')));
    itemRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          item: doc.data(),
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
          <View >
          <Text style={styles.title}>Item Offered By: {this.state.offer.sender} </Text>
          <Image source={{uri:this.state.item.url}}
            style={styles.image}/>
          </View>
          <InputWithLabel style={styles.output}
            label={'Item Name'}
            value={this.state.item.name}
            orientation={'vertical'}
            editable={false}
            multiline={true}
          />
          <InputWithLabel style={styles.output}
            label={'Description'}
            value={this.state.item.description}
            orientation={'vertical'}
            editable={false}
            multiline={true}
          />
          <InputWithLabel style={styles.output}
            label={'Category'}
            value={this.state.item.category}
            orientation={'vertical'}
            editable={false}
          />

          <InputWithLabel style={styles.output}
            label={'Service offered'}
            value={this.state.offer.service}
            orientation={'vertical'}
            editable={false}
            multiline={true}
          />
          <InputWithLabel style={styles.output}
            label={'Point Offered'}
            value={this.state.offer.point.toString()}
            orientation={'vertical'}
            editable={false}
            multiline={true}
          />


          <View style={styles.subContainer}>
            <Button
              large
              title='Accept'
              onPress={() => {}}
            />
          </View>
          <View style={styles.subContainer}>
            <Button
              large
              title='Decline'
              onPress={() => {}}
            />
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
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title:{
    fontSize:24,
    color:'black',
    fontStyle:'italic'
  },
  output: {
    fontSize: 24,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  image:{
    flex:1,
    width:'100%',
    height:450,
  },
  time:{
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  }
})
