import React from 'react';
import { StyleSheet, TextInput, Image, Text, View, Button, TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

export default class Create extends React.Component {
  static navigationOptions = {
    title:'Upload Item',
  };

  constructor(){
    super();
    this.ref = firebase.firestore().collection('items');
    this.state = {
      name: '',
      description: '',
      category: '',
      point:'',
      service:'',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveItem() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      point: parseInt(this.state.point),
      service:this.state.service,
      user:firebase.auth().currentUser.uid
    }).then((docRef) => {
      this.setState({
        name: '',
        description: '',
        category: '',
        point: '',
        service:'',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  state = { currentUser: null }
  render() {
  if(this.state.isLoading){
    return(
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
            placeholder={'Name'}
            value={this.state.name}
            onChangeText={(text) => this.updateTextInput(text, 'name')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Description'}
            value={this.state.description}
            onChangeText={(text) => this.updateTextInput(text, 'description')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            placeholder={'category'}
            value={this.state.category}
            onChangeText={(text) => this.updateTextInput(text, 'category')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            keyboardType='numeric'
            placeholder={'Enter Points You want to Exchange For'}
            value={this.state.point}
            onChangeText={(text) => this.updateTextInput(text, 'point')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            keyboardType='numeric'
            placeholder={'Enter Points You want to Exchange For'}
            value={this.state.point}
            onChangeText={(text) => this.updateTextInput(text, 'point')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Enter Services you want to Exchange with'}
            value={this.state.service}
            onChangeText={(text) => this.updateTextInput(text, 'service')}
        />
      </View>
      <View style={styles.button}>
        <Button
          large
          leftIcon={{name: 'save'}}
          title='Save'
          onPress={() => this.saveItem()} />
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
