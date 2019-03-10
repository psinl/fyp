import React from 'React';
import {createDrawerNavigator} from 'react-navigation';

import Main from '../screens/Main';

const DrawerNavigator = createDrawerNavigator({
  Main: Main
});


export {DrawerNavigator}
