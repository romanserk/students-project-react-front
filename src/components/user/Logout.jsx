import React from 'react';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'


import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';





const Logout = (props) => {


    const logoutAction = () => {
        localStorage.removeItem("user_login");
        props.setUserData({});
        props.setLoggedIn(false)
        props.history.push(`/`);
    }

    return (

        <Button variant="danger" size="md" onClick={() => logoutAction()}>
            Logout
        </Button>

    )

}

const mapStateToProps = state => {
    return {
        loggedIn: state.users.isLoggedIn
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: () => dispatch({ type: actionType.SET_LOGGED_IN }),
        setUserData: (userData) => dispatch({ type: actionType.SET_USER_DATA, userData: userData }),
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));