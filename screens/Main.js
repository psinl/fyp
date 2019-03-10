import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, DrawerLayoutAndroid } from 'react-native';
import firebase from 'react-native-firebase';

import { FloatingAction } from 'react-native-floating-action';
import DrawerScreen from './DrawerScreen';

const actions = [{
  text:'Add',
  icon: require('../images/add.png'),
  name:'add',
  position:1
}];

export default class Main extends React.Component {
  static navigationOptions = {
    drawerlabel:'Main'
  }
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
    return (
      <DrawerLayoutAndroid
        ref={'MyDrawer'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() =>
          <DrawerScreen />
        }
      >
          <View style={styles.container}>
            <Text style={{position: 'absolute', top: 5, right: 5}}>
              {currentUser && currentUser.email}!
            </Text>
            <Button title="Logout" onPress={this.handleLogout} />
            <FloatingAction
              actions={actions}
              overrideWithAction={true}
              color={'#33cccc'}
              onPressItem={()=>{}}
            />
          </View>
        </DrawerLayoutAndroid>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
