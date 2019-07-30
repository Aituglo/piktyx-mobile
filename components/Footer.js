import React from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionCreatorsAuth from '../actions/auth';
import * as actionCreatorsData from '../actions/data';
import { withNavigation } from 'react-navigation';

function mapStateToProps(state) {
  return {
      data: state.data,
      token: state.auth.token,
      loaded: state.data.loaded,
      isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: {
          dataActions : bindActionCreators(actionCreatorsData, dispatch),
          authActions : bindActionCreators(actionCreatorsAuth, dispatch)
      }
  };
}


class MyFooter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      active: 'Main'
    }
  }

  change_view = (route) => {
    
    this.props.navigation.navigate(route);
    this.setState({active: route});
  }

  render() {
    if(this.props.isAuthenticated){
      return (
        <Footer>
          <FooterTab>
            <Button active={this.state.active === 'Main'} onPress={() => this.change_view('Main')}>
              <Icon active={this.state.active === 'Main'} name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active={this.state.active === 'Profile'} onPress={() => this.change_view('Profile')}>
              <Icon active={this.state.active === 'Profile'} name="person" />
            </Button>
          </FooterTab>
        </Footer>
      )
    }else{
      return (null)
    }
    
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MyFooter))