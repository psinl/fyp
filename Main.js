import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

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
  componentDidMount() {
    const {currentUser} = firebase.auth()
    this.setState({currentUser})
  }
  state = { currentUser: null }
render() {
    const { currentUser } = this.state
return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
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
