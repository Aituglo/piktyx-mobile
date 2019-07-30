import React from "react";
import Container from "../../components/Container";
import { connect } from 'react-redux';
import Button from "../../components/Button";
import { Text, H1, H2, Spinner, View } from "native-base";
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

import { withTranslation } from 'react-i18next';

function mapStateToProps(state) {
    return {
        data: state.data,
        token: state.auth.token,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class ProfileScreen extends React.Component {
  state = {
    searchInput: ""
  };

  componentDidMount() {
    this.fetchData();
  }


  fetchData() {
      const token = this.props.token;
      this.props.fetchProtectedData(token);
  }


  render() {
    const { t } = this.props;
    return (
      <Container title={t("HEADER_PROFILE")}>
        {!this.props.loaded
                    ? <Spinner color='blue' />
                    :
                    <View>
                        <H1>{t("AUTH_ACCOUNT_TITLE")}</H1>
                        <H2>{t("AUTH_EMAIL")} : {this.props.data.data.email}</H2>
                        <H2>{t("AUTH_USERNAME")} : {this.props.data.data.username}</H2>
                    </View>
                }
      </Container>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen))