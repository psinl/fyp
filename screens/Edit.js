import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  Image,
  Button,
  Picker,
} from 'react-native';
import firebase from 'react-native-firebase';
import {InputWithLabel} from '../components/UI';
import ImagePicker from 'react-native-image-picker';

const options = {
  title:'Select Item Picture',
};


export default class Edit extends React.Component{
  static navigationOptions = {
    title: 'Edit Board',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      name: '',
      description: '',
      url: '',
      category:'',
      point:'',
      service:'',
      itemWish:'',
      timestamp:''
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
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('items').doc(JSON.parse(navigation.getParam('itemkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const item = doc.data();
        this.setState({
          key: doc.id,
          name: item.name,
          description: item.description,
          category: item.category,
          point:item.point,
          service:item.service,
          itemWish:item.itemWish,
          user:item.user,
          image:item.image,
          url:item.url,
          timestamp:item.timestamp,
          isLoading: false
        });


      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateItem() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('items').doc(this.state.key);
    updateRef.set({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      point: parseInt(this.state.point),
      service:this.state.service,
      itemWish:this.state.itemWish,
      user:this.state.user,
      image:this.state.image,
      url:this.state.url,
      timestamp:this.state.timestamp
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        category: '',
        point:'',
        service:'',
        itemWish:'',
        timestamp:'',
        isLoading: false,
      });
      this.props.navigation.navigate('Main');
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
      url:url
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
        <Image source={{uri:this.state.url}}
          style={{width:'100%',height: 250}}/>
        <Button title="Select Image" onPress={this.choosePhoto}/>
        <InputWithLabel style={styles.input}
          label={'Title'}
          value={this.state.name}
          onChangeText={(name) => {this.setState({name})}}
          orientation={'vertical'}
        />
        <InputWithLabel style={styles.input}
          label={'Description'}
          value={this.state.description}
          onChangeText={(description) => {this.setState({description})}}
          orientation={'vertical'}
        />
        <Picker
          selectedValue={this.state.category}
          onValueChange={ (value) => ( this.setState({category : value}) )}>
          { this.categoryList() }
        </Picker>
        <InputWithLabel style={styles.input}
          label={'Wish to sell with point: '}
          value={this.state.point.toString()}
          onChangeText={(point) => {this.setState({point})}}
          orientation={'vertical'}
          keyboardType='numeric'
        />
        <InputWithLabel style={styles.input}
          label={'Wish to exchange with service:'}
          value={this.state.service}
          onChangeText={(service) => {this.setState({service})}}
          orientation={'vertical'}
          multiline={true}
        />
        <InputWithLabel style={styles.input}
          label={'Wish to exchange with Item: '}
          value={this.state.itemWish}
          onChangeText={(itemWish) => {this.setState({itemWish})}}
          orientation={'vertical'}
          multiline={true}
        />
        <InputWithLabel style={styles.input}
          label={'Uploaded at'}
          value={this.state.timestamp.toString()}
          orientation={'vertical'}
          editable={false}
        />
        <View style={styles.subContainer}>
          <Button
            large
            title='Update'
            onPress={() => this.updateItem()} />
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
