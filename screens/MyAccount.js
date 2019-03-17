import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity,ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class MyAccount extends React.Component {
  static navigationOptions = {
    title:'My Account',

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
  componentDidMount() {
    const {currentUser} = firebase.auth()
    this.setState({currentUser})
  }
  state = { currentUser: null }
  render() {
    const { currentUser } = this.state
    if(firebase.auth().currentUser.email == 'admin@gmail.com'){
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{position: 'absolute', top: 5, right: 5}}>
            {currentUser && currentUser.email }
          </Text>
          <View>
          </View>
          <View style={styles.subContainer}>
            <Button
              large
              title='Add User'
              onPress={()=>this.props.navigation.navigate('SignUp')}
            />
            <Button
              large
              title='Logout'
              onPress={()=>this.handleLogout()}
            />
          </View>
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
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{position: 'absolute', top: 5, right: 5}}>
          {currentUser && currentUser.email }
        </Text>
        <View>
        </View>
        <View style={styles.subContainer}>
          <Button
            large
            title='My Stuff'
            onPress={()=>this.props.navigation.navigate('MyStuff')}
          />
          <Button
            large
            title='Logout'
            onPress={()=>this.handleLogout()}
          />
        </View>
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
  subContainer: {
    flex: 1,
    padding: 5,
    marginTop:20,
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',

  },
})
