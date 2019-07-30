import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import MainRouter from './containers/MainRouter';

import store from './store/configureStore';

import './i18n';

export default class App extends React.Component {

  state = {
    ready: false
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("native-base/Fonts/Ionicons.ttf")
    })

    this.setState({ ready: true });
  }

  render() {
    if (!this.state.ready) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    };

    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});