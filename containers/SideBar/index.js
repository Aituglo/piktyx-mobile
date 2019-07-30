import React from "react";
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../actions/auth';

function mapStateToProps(state) {
  return {
      data: state.data,
      token: state.auth.token,
      loaded: state.data.loaded,
      isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


class SideBar extends React.Component {

  constructor(props) {
    super(props);

  }

  logout() {
      this.props.logoutAndRedirect();
      this.props.navigation.navigate('Home');
  }
  
  render() {
    const { t } = this.props;
    const routes = [{route:"Main", name:"HEADER_MAIN"}, {route:"Profile", name:"HEADER_PROFILE"}]
    if (this.props.isAuthenticated){
      return (
        <Container> 
          <Content>
            <List
              dataArray={routes}
              contentContainerStyle={{ marginTop: 50 }}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this.props.navigation.navigate(data.route)}
                  >
                    <Text>{t(data.name)}</Text>
                  </ListItem>
                );
              }}
            />
            <ListItem
                    button
                    onPress={() => this.logout()}
                  >
                    <Text>{t("AUTH_LOGOUT")}</Text>
            </ListItem>
          </Content>
        </Container>
      );
    }else{
      return null
    }
    
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SideBar))