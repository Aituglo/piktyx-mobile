import React from "react";
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Form, Item, Input, Text } from 'native-base';
import * as actionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateEmail } from '../../utils/misc';

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


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        redirectTo: 'Main',
        email_error_text: null,
        password_error_text: null,
        disabled: true
    };
  
  
  }

  isDisabled() {
    let email_is_valid = false;
    let password_is_valid = false;

    if (this.state.email === '') {
        this.setState({
            email_error_text: null,
        });
    } else if (validateEmail(this.state.email)) {
        email_is_valid = true;
        this.setState({
            email_error_text: null,
        });

    } else {
        this.setState({
            email_error_text: 'Sorry, this is not a valid email',
        });
    }

    if (this.state.password === '' || !this.state.password) {
        this.setState({
            password_error_text: null,
        });
    } else if (this.state.password.length >= 6) {
        password_is_valid = true;
        this.setState({
            password_error_text: null,
        });
    } else {
        this.setState({
            password_error_text: 'Your password must be at least 6 characters',
        });

    }

    if (email_is_valid && password_is_valid) {
        this.setState({
            disabled: false,
        });
    }

  }

  changeValue(text, type) {
    const value = text;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state);
  }

  login() {
    this.props.loginUser(this.state.email, this.state.password)
    .then(() => {
      if(this.props.isAuthenticating){
        this.setState({email:'', password:''});
        this.props.navigation.navigate('Main');
      }else{
        this.setState({email:'', password:''});
      }
      
    });
  } 

  changeView = (route) => {
    this.props.navigation.navigate(route);
  }


  render() {
    const { t } = this.props;
    return (
      <Container title={t("HEADER_LOGIN")}>
        {
          this.props.statusText &&
            <Text>{this.props.statusText}</Text>
        }
        <Form>
          <Item>
            <Input placeholder={t("AUTH_EMAIL")} error={this.state.email_error_text} value={this.state.email} onChangeText={(text) => this.changeValue(text, 'email')}/>
          </Item>
          <Item last>
            <Input placeholder={t("AUTH_PASSWORD")} error={this.state.password_error_text} secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.changeValue(text, 'password')}/>
          </Item>
          <Button disabled={this.state.disabled} action={() => this.login()}>
            {t("AUTH_LOGIN")}
          </Button>
        </Form>
        <Button action={() => this.changeView('Register')}>{t("AUTH_REGISTER")}</Button>
      </Container>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));