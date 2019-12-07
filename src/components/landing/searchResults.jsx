import React, { useEffect, useState } from 'react';
import ProjectsList from '../projects/projectsList';

import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';
import MySpinner from '../hoc/Spinner'

import { getProjectsFromServerBySearch } from '../projects/ProjectFunctions'


const SearchResults = (props) => {

    const [loading, setLoading] = useState(true)


    const getSearchResults = async (searchText) => {
        await getProjectsFromServerBySearch(searchText)
            .then(projectsRes => {
                props.setProjects(projectsRes)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        setLoading(true)
        getSearchResults(props.location.state.searchText)
        // eslint-disable-next-line
    }, [props.location.state.searchText])

    return (
        <Container>
            {loading ?
                <MySpinner /> :
                <ProjectsList />}
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



export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);