import React from "react";
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Form, Item, Input, Text } from 'native-base';
import * as actionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';

function mapStateToProps(state) {
  return {
      isAuthenticating: state.auth.isAuthenticating,
      registerStatusText: state.auth.registerStatusText,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        username: '',
        redirectTo: 'Main'
    };
  
  
  }

  changeValue(text, type) {
    const value = text;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state);
  }

  register() {
    this.props.registerUser(this.state.username, this.state.email, this.state.password)
    .then(() => {
      if(this.props.isAuthenticating){
        this.setState({email:'', password:'', username: ''});
        this.props.navigation.navigate('Main');
      }else{
        this.setState({email:'', password:'', username: ''});
      }
      
    });
  } 

  changeView = (route) => {
    this.props.navigation.navigate(route);
  }

  render() {
    const { t } = this.props;
    return (
      <Container title={t("HEADER_REGISTER")}>
        {
          this.props.registerStatusText &&
            <Text>{this.props.registerStatusText}</Text>
        } 
        <Form>
          <Item>
            <Input placeholder={t("AUTH_EMAIL")} value={this.state.email} onChangeText={(text) => this.changeValue(text, 'email')}/>
          </Item>
          <Item>
            <Input placeholder={t("AUTH_USERNAME")} value={this.state.username} onChangeText={(text) => this.changeValue(text, 'username')}/>
          </Item>
          <Item last>
            <Input placeholder={t("AUTH_PASSWORD")} secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.changeValue(text, 'password')}/>
          </Item>
          <Button action={() => this.register()}>
            {t("AUTH_REGISTER")}
          </Button>
        </Form>
        <Button action={() => this.changeView('Login')}>{t("AUTH_LOGIN")}</Button>
      </Container>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen));