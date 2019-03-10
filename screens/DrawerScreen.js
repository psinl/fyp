import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
TouchableOpacity,
} from 'react-native';
import Main from './Main';
export default class DrawerScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 48,
    color: 'black',
  },
})
