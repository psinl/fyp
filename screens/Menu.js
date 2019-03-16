import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight
} from 'react-native';
import firebase from 'react-native-firebase';
import { SearchBar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <View style={{flexDirection:'row'}}>
          <View style={{flex:4}}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              searchIcon={false}
              platform='android'
            />
          </View>
          <View style={{flex:1}}>
            <Button
              icon={
                <Icon
                  name="search"
                  size={15}
                  color="white"
                />
              }
              buttonStyle={{height:63,marginTop:2}}
              onPress={ () => {
                this.props.navigation.navigate('Search', {
                  search: `${JSON.stringify(this.state.search)}`,
                });
                this.setState({search:''})
             }}
             />
          </View>
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
            <TouchableHighlight
              onPress={ () => {
                this.props.navigation.navigate('Category', {
                  category : `${JSON.stringify(item.key)}` ,
                });
             }}
            >
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{item.key}</Text>
              </View>
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
    fontSize:20,
    color:'black'
  },
  search:{
    width:'100%'
  },
  categoryContainer:{
    marginTop:5,

  }
})
