import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import localStorage from 'react-native-sync-localstorage';


import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export function requireNoAuthentication(Component) {

    class notAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            };
        }

        componentWillMount() {
            localStorage.getAllFromLocalStorage()
            .then(() => {
                this.checkAuth();
            })
            .catch(err => {
                console.warn(err)
            })
            
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {

            if (props.isAuthenticated) {
                props.navigation.navigate('Main');

            } else {
                const token = localStorage.getItem('token');

                if (token) {
                    fetch('http://192.168.0.15:5000/api/is_token_valid', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json', // eslint-disable-line quote-props
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                props.navigation.navigate('Main');

                            } else {
                                this.setState({
                                    loaded: true,
                                });
                            }
                        });
                } else {
                    this.setState({
                        loaded: true,
                    });
                }
            }
        }

        render() {
            if(!this.props.isAuthenticated && this.state.loaded){
                return (
                      <Component {...this.props} />
                );
            }else{
                return (
                    null
                );
            }
            

        }
    }

    notAuthenticatedComponent.propTypes = {
        loginUserSuccess: PropTypes.func,
        isAuthenticated: PropTypes.bool,
    };

    return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);

}
