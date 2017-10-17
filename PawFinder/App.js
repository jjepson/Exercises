import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {MyFiltersScreen} from './MyFiltersScreen.js'
import {MyProfileScreen} from './MyProfileScreen.js'
import {MyPetsScreen} from './MyPetsScreen.js'

export default class App extends React.Component {
  render() {
    return <ModalStack />;
  }
}

const MyApp = TabNavigator({
  Pets: {
    screen: MyPetsScreen,
  },
  Filters: {
    screen: MyFiltersScreen,
  },
});

const ModalStack = StackNavigator({
  Home: {
    screen: MyApp,
  },
  Profile: {
    screen: MyProfileScreen,
  },
});