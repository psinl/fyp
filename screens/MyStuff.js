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
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class MyStuff extends React.Component {
  static navigationOptions = {
    title:'My Stuff',

  };
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

  onCollectionUpdate = ()=>{
    this.ref.where("user","==",firebase.auth().currentUser.uid).get()
    .then((querySnapshot) => {
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
          {currentUser && currentUser.email}
        </Text>
        <FlatList
          data={ this.state.items }
          showsVerticalScrollIndicator={ false }
          renderItem={({item}) =>
            <TouchableHighlight
              underlayColor={'#cccccc'}
              style={{width:400}}
              onPress={ () => {
                this.props.navigation.navigate('ShowDetails', {
                  itemkey: `${JSON.stringify(item.key)}`,
                });
             }}
            >
              <View style={styles.item}>
                <Image source={{uri:`${item.url}`}}
                  style={styles.image}/>
                <View style={styles.itemDetails}>
                <Text numberOfLines={1} style={styles.itemTitle}>{ item.name }</Text>
                <Text style={styles.itemSubtitle}>{ item.category }</Text>
                <Text numberOfLines={1}>{item.description}</Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item) => {item.key.toString()}}
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
    flex:1,
    backgroundColor:'#33cccc',
    height:30
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
    flex: 1,
    width: '100%',
    height: '100%',
    marginRight:20,
  },
  item: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop:20,
  },
  itemDetails:{
    flex: 2,
    width: '100%',
    height: '100%',
    marginTop:20,
    marginBottom:20,
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
