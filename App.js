import {
  createStackNavigator,
} from 'react-navigation';

import Login from './screens/Login';
import Main from './screens/Main';
import MyAccount from './screens/MyAccount';
import Menu from './screens/Menu';

export default createStackNavigator({
  Main:{
    screen: Main
  },
  Login:{
    screen: Login
  },
  MyAccount:{
    screen: MyAccount
  },
  Menu:{
    screen: Menu
  }

}, {
  initialRouteName: 'Login',
  navigationOptions:{
    headerStyle:{
      backgroundColor: '#33cccc',
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight: 'bold',
    },
  },
});
