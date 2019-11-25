import React from 'react'
import AuthContext from '../../context/authContext'

import { NavLink } from 'react-router-dom'


const AuthNavItems = () => {


    const getNavItems = (ctx) => {
        return (ctx.userLoggedIn ?
            <>
                <NavLink to="/projects/add" className="ml-4 mr-4 p-2 color-white link-hover">Add Project</NavLink>
                <NavLink to={{
                    pathname: '/profile/' + ctx.userData.user_name,
                    state: {
                        user: ctx.userData.user_name
                    }
                }}
                    className="ml-4 mr-4 p-2 color-white link-hover">
                    Profile
                </NavLink>
                <NavLink to="/notification" className="ml-4 mr-4 p-2 color-white link-hover">Notification</NavLink>
            </> :
            <>
                <NavLink to="/login" className="ml-4 mr-4 p-2 color-white link-hover">Login</NavLink>
                <NavLink to="/register" className="ml-4 mr-4 p-2 color-white link-hover">Register</NavLink>
            </>
        )
    }


    return (
        <AuthContext.Consumer>
            {(context) => getNavItems(context)}
        </AuthContext.Consumer>
    )
}

export default AuthNavItems;