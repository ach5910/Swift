import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import HomeScreen from './Screens/HomeScreen';
import AddWorkoutScreen from './Screens/AddWorkoutScreen';
import configureStore from './configureStore';

const store = configureStore();

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Swift'
      }),
    },
      AddWorkout:{
      screen: AddWorkoutScreen,
      navigationOptions: () => ({
        title: 'Swift'
      })
    }
  },
  {
    initialRouteName: 'Home',
  }
)


const jsx = () => (
  <Provider store={store}>
    <RootStack/>
  </Provider>
)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
