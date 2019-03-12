import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  Button,
  TouchableOpacity,ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import firebase from 'react-native-firebase';

import { FloatingAction } from 'react-native-floating-action';

const actions = [{
  text:'Add',
  icon: require('../images/add.png'),
  name:'add',
  position:1
}];

export default class Main extends React.Component {
  handleLogout = () => {
    const { email, password } = this.state
    firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate('Login'))
    .catch(error => this.setState({errorMessage:error.message}))
    console.log('handleLogout')
  }
  constructor(){
    super();
    this.ref = firebase.firestore().collection('items');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      items:[]
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      const{name,category, description,imageFileName,point,service,user,url} = doc.data();
      items.push({
        key:doc.id,
        doc,
        name,
        category,
        description,
        imageFileName,
        url,
        point,
        service,
      });
    });
    this.setState({
      items,
      isLoading:false,
    })
  }

  componentDidMount() {
    const {currentUser} = firebase.auth()
    this.setState({currentUser})
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

  }
  state = { currentUser: null }
  render() {
    const { currentUser } = this.state
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{position: 'absolute', top: 5, right: 5}}>
          {currentUser && currentUser.email}!
        </Text>
        <FlatList
          data={ this.state.items }
          showsVerticalScrollIndicator={ false }
          renderItem={({item}) =>
            <TouchableHighlight
              underlayColor={'#cccccc'}
              onPress={ () => {
             }}
            >
              <View style={styles.item}>
                <Image source={item.url}/>
                <Text style={styles.itemTitle}>{ item.name }</Text>
                <Text style={styles.itemSubtitle}>{ item.description }</Text>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item) => {item.key.toString()}}
        />
        <FloatingAction
          actions={actions}
          overrideWithAction={true}
          color={'#33cccc'}
          onPressItem={()=>{this.props.navigation.navigate('Create')}}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')}>
              <Image
                source={require('../images/drawer.png')}
                style={{ width: 25, height: 25, marginLeft: 55 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Main')}>
              <Image
                source={require('../images/home.png')}
                style={{ width: 25, height: 25, marginLeft: 55 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyAccount')}>
              <Image
                source={require('../images/user.png')}
                style={{ width: 25, height: 25, marginLeft: 55 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer:{
    flex: 1,
    bottom:0,
    position:'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    justifyContent:'flex-end',
    flex:1
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
  item: {
  justifyContent: 'center',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 25,
  paddingRight: 25,
  borderBottomWidth: 1,
  borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',

  },
  itemSubtitle: {
    fontSize: 18,
  }
})
