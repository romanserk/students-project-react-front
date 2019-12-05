import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'


import { Container, Jumbotron, Col, Table } from 'react-bootstrap';
import ProjectsList from '../projects/projectsList'
import { getUserFromServer } from './UserFunctions'
import MySpinner from '../hoc/Spinner'



import Logout from './Logout';

const Profile = (props) => {

    const [loading, setLoading] = useState(true)

    const getUser = async (username) => {
        await getUserFromServer(username)
            .then(response => {
                if (response.error) {
                    props.history.push(`/`)
                    return
                }
                props.setProfilePage(response)
                setLoading(false)
            })

    }

    useEffect(() => {

        getUser(props.history.location.pathname.slice(9))

        // eslint-disable-next-line
    }, [props.location.state, loading])




    return (
        loading ?
            <MySpinner />
            :
            <Container>
                <>
                    <Jumbotron className="mt-5 my-shadow">
                        <Col sm={8} className="mx-auto">
                            <h1 className="text-center">{props.profilePageData.user_name}</h1>
                        </Col>
                        <Table className="col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>Email</td>
                                    <td>{props.profilePageData.email}</td>
                                </tr>
                                <tr>
                                    <td>Github profile</td>
                                    <td><a href={props.profilePageData.github_profile} target="_blanck">{props.profilePageData.github_profile}</a></td>
                                </tr>
                            </tbody>
                        </Table>
                        {props.loggedIn && props.history.location.pathname.slice(9) === props.userData.user_name ? <Logout /> : null}
                    </Jumbotron>
                    <ProjectsList user_name={props.profilePageData.user_name} userID={props.userData.ID} />
                </>

            </Container>
    )


}
const mapStateToProps = state => {
    return {
        loggedIn: state.users.isLoggedIn,
        userData: state.users.userData,
        profilePageData: state.users.profilePageData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: (isLogged) => dispatch({ type: actionType.SET_LOGGED_IN, isLogged: isLogged }),
        setUserData: (userData) => dispatch({ type: actionType.SET_USER_DATA, userData: userData }),
        setProfilePage: (profilePageData) => dispatch({ type: actionType.SET_PROFILE_PAGE_DATA, profilePageData: profilePageData }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)