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
      receiverId:'',
      senderId:'',
      receiverPoint:0,
      senderPoint:0,
    };
    this.userRef = firebase.firestore().collection('users');
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

  acceptOffer() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('offers').doc(JSON.parse(navigation.getParam('offerkey')));
    ref.update({
      status:'Accept'
    })
    const itemRef = firebase.firestore().collection('items').doc(JSON.parse(navigation.getParam('itemkey')));
    itemRef.update({
      status:'Inactive'
    })
    if(this.state.offer.point != 0){
      this.userRef.where('email','==',this.state.offer.sender).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          console.log(doc.id);
          const sender = doc.data();
          this.setState({
            senderId:doc.id,
            senderPoint:sender.point,
          })
        })
        console.log(this.state.senderId)
        console.log('senderPoint'+this.state.senderPoint.toString())
        console.log(this.state.offer.point.toString())
      })
      .then(()=>{
        this.userRef.doc(this.state.senderId).set({
          email:this.state.offer.sender,
          point:this.state.senderPoint - this.state.offer.point
        })
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

      this.userRef.where('email','==',this.state.offer.receiver).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          console.log(doc.id);
          const receiver = doc.data();
          this.setState({
            receiverId:doc.id,
            receiverPoint:receiver.point,
          })

        })
        console.log(this.state.receiverId)
        console.log('receiverPoint'+this.state.receiverPoint.toString())
        console.log(this.state.offer.point.toString())
      })
      .then(()=>{
        this.userRef.doc(this.state.receiverId).set({
          email:this.state.offer.receiver,
          point:this.state.offer.point+ this.state.receiverPoint
        })
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    }
    this.props.navigation.goBack();
  }

  declineOffer() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('offers').doc(JSON.parse(navigation.getParam('offerkey')));
    ref.update({
      status:'Decline'
    })

    this.props.navigation.goBack();
  }

  deleteOffer(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('offers').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('MyOffer');
      Alert.alert('Offer deleted successfully');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
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
    if(this.state.offer.receiver == firebase.auth().currentUser.email){
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
              onPress={() => this.acceptOffer()}
            />
          </View>
          <View style={styles.subContainer}>
            <Button
              large
              title='Decline'
              onPress={() => this.declineOffer()}
            />
          </View>


        </ScrollView>

      );
    } else {
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
              title='Delete Offer'
              onPress={() => this.deleteOffer(this.state.key)}
            />
          </View>
        </ScrollView>
      );
    }

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
