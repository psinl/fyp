import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  Text,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import {InputWithLabel} from '../components/UI';

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
          style={{width:'100%',height: 250}}/>
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
          label={'Point to buy'}
          value={this.state.item.point.toString()}
          orientation={'vertical'}
          editable={false}
        />
        <InputWithLabel style={styles.output}
          label={'Service to exchange'}
          value={this.state.item.service}
          orientation={'vertical'}
          editable={false}
          multiline={true}
        />
        <InputWithLabel style={styles.output}
          label={'Item Wish to Exchange with'}
          value={this.state.item.itemWish}
          orientation={'vertical'}
          editable={false}
          multiline={true}
        />
        <InputWithLabel style={styles.output}
          label={'Uploaded at'}
          value={this.state.item.timestamp.toString()}
          orientation={'vertical'}
          editable={false}
          multiline={true}
        />

        <View style={styles.subContainer}>
          <Button
            large
            title='Make Offer'
            onPress={() => {}} />
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
    marginBottom: 30,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  output: {
    fontSize: 24,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
})
