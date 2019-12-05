import React from 'react'
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom'


const AuthNavItems = (props) => {




    return (
        <>
            {props.loggedIn && props.userData.user_name ?
                <>
                    <NavLink to="/projects/add" className="ml-4 mr-4 p-2 color-white link-hover">Add Project</NavLink>
                    <NavLink to={{
                        pathname: '/profile/' + props.userData.user_name,
                        state: {
                            user: props.userData.user_name
                        }
                    }}
                        className="ml-4 mr-4 p-2 color-white link-hover">
                        Profile
                    </NavLink>
                    <NavLink to="/notification" className="ml-4 mr-4 p-2 color-white link-hover disabled">Notification</NavLink>
                </> :
                <>
                    <NavLink to="/login" className="ml-4 mr-4 p-2 color-white link-hover">Login</NavLink>
                    <NavLink to="/register" className="ml-4 mr-4 p-2 color-white link-hover">Register</NavLink>
                </>}
        </>

    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.users.isLoggedIn,
        userData: state.users.userData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setUserData: (userData) => dispatch({ type: 'SET_USER_DATA', userData: userData }),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(AuthNavItems);