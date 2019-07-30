import React from "react";
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Text } from 'native-base';
import * as actionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';

function mapStateToProps(state) {
  return {
      isAuthenticating: state.auth.isAuthenticating,
      statusText: state.auth.statusText,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        redirectTo: 'Profile'
    };
  
  
  }

  changeView = (route) => {
    this.props.navigation.navigate(route);
  }

  

  render() {
    const { t } = this.props;
    return (
      <Container title={t("HEADER_HOME")}>
        <Text>{t("WELCOME_SCREEN")}</Text>
        <Button action={() => this.changeView('Login')}>{t("AUTH_LOGIN")}</Button>
        <Button action={() => this.changeView('Register')}>{t("AUTH_REGISTER")}</Button>
      </Container>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));