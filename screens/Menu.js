import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight
} from 'react-native';
import firebase from 'react-native-firebase';
import { SearchBar } from 'react-native-elements';

export default class Menu extends React.Component {
  static navigationOptions = {
    title:'Category',
  };

  state = {
    search:'',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  componentDidMount() {
    const {currentUser} = firebase.auth()
    this.setState({currentUser})
  }

  state = { currentUser: null }
  render() {
    const { search } = this.state;
    const { currentUser } = this.state
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{position: 'absolute', top: 5, right: 5}}>
          {currentUser && currentUser.email}!
        </Text>
        <View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            platform='android'
            containerStyle={styles.search}
          />
        </View>
        <View style={styles.subContainer}>
          <FlatList
          data={[
            {key: 'Electronic Devices'},
            {key: 'Electronic Accessories'},
            {key: 'Home Appliances'},
            {key: 'Health and Beauty'},
            {key: 'Toys'},
            {key: 'Groceries'},
            {key: 'Woman Fashion'},
            {key: 'Man Fashion'},
            {key: 'Fashion Accessories'},
            {key: 'Sports & Travel'},
            {key: 'Digital Goods'},
            {key: 'Service'},
            {key: 'Other'},
          ]}
          renderItem={({item}) =>
            <TouchableHighlight>
              <Text style={styles.category}>{item.key}</Text>
            </TouchableHighlight>
          }
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
    marginTop:10,
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
  category:{
    fontSize:20
  },
  search:{
    width:'100%'
  }
})
