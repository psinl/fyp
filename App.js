import {
  createStackNavigator,
} from 'react-navigation';

import Loading from './Loading';
import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';

export default createStackNavigator({
  Main:{
    screen: Main
  },
  Loading:{
    screen: Loading
  },
  Login:{
    screen: Login
  },
  SignUp:{
    screen: SignUp
  }
}, {
  initialRouteName: 'Loading',
  navigationOptions:{
    headerStyle:{
      backgroundColor: '#a80000',
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight: 'bold',
    },
  },
});
