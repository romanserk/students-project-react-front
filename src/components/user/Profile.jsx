import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'

import MySpinner from '../hoc/Spinner'
import { Container, Jumbotron, Col, Table } from 'react-bootstrap';
import ProjectsList from '../projects/projectsList'
import { getUserFromServer } from './UserFunctions'
import { getProjectsFromServer } from '../projects/ProjectFunctions'



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
                getProjects(response)
            }).catch(err => console.log(err))
    }


    const getProjects = async (data) => {

        await getProjectsFromServer(props.history.location.pathname.slice(9), data.ID)
            .then(projectsRes => {
                props.setProjects(projectsRes)
            })
            .then(res => {
                setLoading(false);
            }).catch(err => console.log(err));

    }

    useEffect(() => {
        setLoading(true)
        getUser(props.history.location.pathname.slice(9))
        // eslint-disable-next-line
    }, [props.location.state])




    return (
        loading ?
            <MySpinner /> :
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
                    <ProjectsList user={true} />
                </>
            </Container>
    )


}
const mapStateToProps = state => {
    return {
        loggedIn: state.users.isLoggedIn,
        userData: state.users.userData,
        profilePageData: state.users.profilePageData,
        projects: state.projects.projects,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setProfilePage: (profilePageData) => dispatch({ type: actionType.SET_PROFILE_PAGE_DATA, profilePageData: profilePageData }),
        setProjects: (projects) => dispatch({ type: actionType.SET_PROJECTS, projects: projects }),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)