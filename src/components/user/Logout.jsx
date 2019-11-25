import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/authContext'




const Logout = (props) => {


    const logoutAction = (context) => {
        localStorage.removeItem("user_login");
        context.setUserLoggedIn(false);
        context.userData = {};
        props.history.push(`/`);
    }

    return (
        <AuthContext.Consumer>
            {(context) =>
                <button className="btn btn-lg btn-danger" onClick={() => logoutAction(context)}>
                    Logout
                </button>
            }
        </AuthContext.Consumer>
    )

}


export default withRouter(Logout);