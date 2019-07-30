import React from 'react';
import { connect } from 'react-redux';
import { Header, Title, Left, Button, Icon, Body, Right } from 'native-base';
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


class MyHeader extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Header>
        {this.props.isAuthenticated &&
          <Left>
          <Button
            transparent
            onPress={() => {this.props.navigation.toggleDrawer()}}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        }
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        {
          this.props.navigation.state.routeName === "Main" &&
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='heart' />
            </Button>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
        }
      </Header>
    )
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MyHeader))