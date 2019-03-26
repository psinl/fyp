import {
  createStackNavigator,
} from 'react-navigation';

import Login from './screens/Login';
import Main from './screens/Main';
import MyAccount from './screens/MyAccount';
import Menu from './screens/Menu';
import Create from './screens/Create';
import ShowDetails from './screens/ShowDetails';
import Edit from './screens/Edit';
import MyStuff from './screens/MyStuff';
import Search from './screens/Search';
import Category from './screens/Category';
import SignUp from './screens/SignUp';
import MakeOffer from './screens/MakeOffer';
import SelectItem from './screens/SelectItem';
import CreditPoint from './screens/CreditPoint';
import MyOffer from './screens/MyOffer';
import OfferDetails from './screens/OfferDetails';
import OfferReceived from './screens/OfferReceived';

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
  ShowDetails:{
    screen: ShowDetails
  },
  Edit:{
    screen: Edit
  },
  MyStuff:{
    screen: MyStuff
  },
  Search:{
    screen:Search
  },
  Category:{
    screen:Category
  },
  SignUp:{
    screen:SignUp
  },
  MakeOffer:{
    screen:MakeOffer
  },
  SelectItem:{
    screen:SelectItem
  },
  CreditPoint:{
    screen:CreditPoint
  },
  MyOffer:{
    screen:MyOffer
  },
  OfferDetails:{
    screen:OfferDetails
  },
  OfferReceived:{
    screen:OfferReceived
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
