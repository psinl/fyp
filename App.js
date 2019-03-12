import {
  createStackNavigator,
} from 'react-navigation';

import Login from './screens/Login';
import Main from './screens/Main';
import MyAccount from './screens/MyAccount';
import Menu from './screens/Menu';
import Create from './screens/Create';
import Gallery from './screens/Gallery';
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
  },
  Create:{
    screen: Create
  },
  Gallery:{
    screen:Gallery
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
