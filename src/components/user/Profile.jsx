import React, { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';

import ProjectsList from '../projects/projectsList'
import AuthContext from '../../context/authContext'

import { getUserFromServer } from './UserFunctions'
import jwt_decode from 'jwt-decode';

import MySpinner from '../hoc/Spinner'



import Logout from './Logout';

const Profile = (props) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const getUser = async (username) => {
        await getUserFromServer(username)
            .then(response => {
                if (response.error) {
                    props.history.push(`/`)
                    return
                }
                setUser(response)
            })
    }

    const generateUser = () => {
        let localUser;

        localUser = localStorage.user_login ? jwt_decode(localStorage.user_login) : null;

        if (props.location.state) {
            if (localUser && props.location.state.user === localUser.user_name && localUser.user_name === props.history.location.pathname.slice(9)) {
                setUser(localUser)
            } else {
                getUser(props.location.state.user)
            }
        } else {
            getUser(props.history.location.pathname.slice(9))
        }

        setLoading(false)
    }


    useEffect(() => {

        generateUser()

        // eslint-disable-next-line
    }, [props.location.state])

    const canLogOut = (context) => {

        return context.userData.user_name === props.history.location.pathname.slice(9) ? <Logout /> : null
    }




    return (
        loading ?
            <MySpinner />
            :
            <Container>
                <AuthContext.Consumer>
                    {(context) => user.user_name &&
                        <>
                            <div className="jumbotron mt-5">
                                <div className="col-sm-8 mx-auto">
                                    <h1 className="text-center">{user.user_name}</h1>
                                </div>
                                <table className="table col-md-6 mx-auto">
                                    <tbody>
                                        <tr>
                                            <td>Email</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Github profile</td>
                                            <td><a href={user.github_profile} target="_blanck">{user.github_profile}</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {canLogOut(context)}
                            </div>
                            <ProjectsList user_name={user.user_name} userID={user.ID} />
                        </>
                    }
                </AuthContext.Consumer>
            </Container>
    )

}

export default Profile