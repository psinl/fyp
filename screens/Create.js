import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Picker,
} from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

const options = {
  title:'Select Item Picture',
};

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
      itemWish:'',
      imageSource: null,
      imageFileName:'',
      imageUrl:'',
      isLoading: false,
    };
    this.categoryData = [
      "Select Category",
      "Electronic Devices",
      "Electronic Accessories",
      "Home Appliances",
      "Health and Beauty",
      "Toys",
      "Groceries",
      "Woman Fashion",
      "Man Fashion",
      "Fashion Accessories",
      "Sports & Travel",
      "Digital Goods",
      "Service",
      "Other"

    ]
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
      itemWish:this.state.itemWish,
      user:firebase.auth().currentUser.uid,
      image:this.state.imageFileName,
      url:this.state.imageUrl,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
      this.setState({
        name: '',
        description: '',
        category: '',
        point: '',
        service:'',
        itemWish:'',
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

  categoryList = () => {
    return (this.categoryData.map( (x, i) => {
      return( <Picker.Item label={x} key={i} value={x} />)
    }));
  }

  setPath= (url) => {
    this.setState({
      imageUrl:url
    })
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
        const fileName = response.fileName + firebase.auth().currentUser.uid;
        const imageRef = firebase.storage().ref('/images/').child(fileName);
        imageRef.put(response.uri,{contentType:'image/jpeg'})
        .then(()=>{
          return imageRef.getDownloadURL()
        })
        .then((url)=>{
          this.setPath(url)
        });

        this.setState({
          imageSource: source,
          imageFileName: fileName,
        });


      }
    });
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
        <Image source={this.state.imageSource} style={{width:'100%',height: 200, margin: 10}}/>
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
          <Picker
            selectedValue={this.state.category}
            onValueChange={ (value) => ( this.setState({category : value}) )}>
            { this.categoryList() }
          </Picker>
      </View>
      <View style={styles.subContainer}>
        <Text>Please enter either one field </Text>
      </View>
      <View style={styles.subContainer}>
        <TextInput
            keyboardType='numeric'
            placeholder={'Enter Point You want to Sell With'}
            value={this.state.point}
            onChangeText={(text) => this.updateTextInput(text, 'point')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Enter Item you want to Exchange with'}
            value={this.state.itemWish}
            onChangeText={(text) => this.updateTextInput(text, 'itemWish')}
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
      <View style={styles.subContainer}>
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
