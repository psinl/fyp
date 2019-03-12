import React from 'react';
import { StyleSheet, TextInput, Image, Text, View, Button, TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';


const options = {
  title:'Select Item Picture',
  takePhoto:'Take Photo',
  chooseFromLibrary:'Choose From Library'
}

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
      avatarSource: null,
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

  choosePhoto= () => {
    ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source,
    });
  }
});
  }
  getSelectedImages = (selectedImages, currentImage) => {

    const image = currentImage.uri

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob


    let uploadBlob = null
    const imageRef = firebase.storage().ref('posts').child("test.jpg")
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);

      })
      .catch((error) => {
        console.log(error);

      })

  }

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
      <View>
        <Button title="Select Image" onPress={this.choosePhoto}/>

      </View>
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
