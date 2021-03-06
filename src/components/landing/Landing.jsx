import React, { useEffect, useState } from 'react';
import ProjectsList from '../projects/projectsList';

import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'


import { getProjectsFromServer } from '../projects/ProjectFunctions'

import MySpinner from '../hoc/Spinner'


const Landing = (props) => {


    const [loading, setLoading] = useState(true);

    const getProjects = async () => {

        await getProjectsFromServer(props.user_name, props.userID)
            .then(projectsRes => {
                props.setProjects(projectsRes)
            })
            .then(res => {
                setLoading(false);
            });

    }

    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, [])


    return (
        <Container>
            {loading ? <MySpinner /> :
                <ProjectsList />
            }

        </Container>
    )
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setProjects: (projects) => dispatch({ type: actionType.SET_PROJECTS, projects: projects }),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Landing);