import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import MainScreen from '../MainScreen';
import SideBar from '../SideBar';
import { requireAuthentication } from '../../components/AuthenticatedComponent';
import { requireNoAuthentication } from '../../components/notAuthenticatedComponent';

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: requireNoAuthentication(HomeScreen) },
    Profile: { screen: requireAuthentication(ProfileScreen) },
    Main: { screen: requireAuthentication(MainScreen) },
    Login: { screen: requireNoAuthentication(LoginScreen) },
    Register: { screen: requireNoAuthentication(RegisterScreen) },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const AppContainer = createAppContainer(HomeScreenRouter);

export default AppContainer;