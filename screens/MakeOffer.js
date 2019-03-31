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
  Alert
} from 'react-native';
import firebase from 'react-native-firebase';

export default class MakeOffer extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Make Offer '
    };
  };

  constructor(props){
    super(props);
    const { navigation } = this.props;
    this.ref = firebase.firestore().collection('offers');
    this.itemRef = firebase.firestore().collection('items').doc(JSON.parse(navigation.getParam('itemkey')));
    this.userRef = firebase.firestore().collection('users');
    this.state = {
      itemId:'',
      service:'',
      point:'0',
      sender:'',
      receiver:'',
      isLoading:'',
      item:{},
      itemkey:'',
      imageUrl:'',
      url:'',
      senderPoint:0,
      status:'Pending',
      bargainId:'',
      bargainStatus:'no status'
    };

  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  returnData(id,url) {
    this.setState({
      itemId:id,
      url: url
    });
  }


  saveOffer() {
    const { navigation } = this.props;
    if(this.state.url != '' || this.state.service != '' || this.state.point != 0){
      if(parseInt(this.state.point)>this.state.senderPoint){
        Alert.alert('Low point balance')
      }else{
        this.setState({
          isLoading: true,
        });
        this.ref.add({
          itemId:this.state.itemId,
          point: parseInt(this.state.point),
          service:this.state.service,
          sender:firebase.auth().currentUser.email,
          receiver:this.state.receiver,
          receiveItemId:JSON.parse(navigation.getParam('itemkey')),
          imageUrl:this.state.imageUrl,
          status:this.state.status,
          bargainId:this.state.bargainId,
          bargainStatus:this.state.bargainStatus
        }).then((docRef) => {
          this.itemRef.update({
            offers:firebase.firestore.FieldValue.arrayUnion(docRef.id)
          })
          this.setState({
            itemId:'',
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

        Alert.alert('Offer successfully make');
      }
    }else{
      Alert.alert('Please enter either one field to make offer')
    }
  }

  componentDidMount(){
    this.itemRef.get().then((doc) => {
      if (doc.exists) {
        const item = doc.data();
        this.setState({
          receiver:item.user,
          imageUrl:item.url
        });
      } else {
        console.log("No such document!");
      }
    });

    this.userRef.where('email','==',firebase.auth().currentUser.email).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.id);
        const sender = doc.data();
        this.setState({
          senderPoint:sender.point,
        })

      })
    })
  }


  render() {
  const { navigation } = this.props;
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
        <Text style={{color:'black',fontStyle:'italic'}}>Please enter either one field </Text>
      </View>

      <View style={styles.subContainer}>
        <TextInput
            placeholder={'Offer Service'}
            value={this.state.service}
            onChangeText={(text) => this.updateTextInput(text, 'service')}
        />
      </View>

      <View style={styles.subContainer}>
        <TextInput
            keyboardType='numeric'
            placeholder={'Offer Point'}
            value={this.state.point}
            onChangeText={(text) => this.updateTextInput(text, 'point')}
        />
      </View>
      <View>

        <Button title="Select Item from MyStuff" onPress={() => this.props.navigation.navigate('SelectItem', {returnData: this.returnData.bind(this)})}/>
        <Text>{this.state.itemId}</Text>
        <View>
          <Image source={{uri:this.state.url}}
            style={styles.image}/>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Button
          large
          leftIcon={{name: 'save'}}
          title='Make Offer'
          onPress={() => this.saveOffer()} />
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
  },
  image:{
    flex:1,
    width:'100%',
    height:250,
  },
})
