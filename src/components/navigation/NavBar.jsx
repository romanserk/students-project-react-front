import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionType from '../../store/actions';

import { getProjectsFromServerBySearch } from '../projects/ProjectFunctions'

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AuthNavItems from './AuthNavItems'


const NavBar = (props) => {


    const [searchText, setSearchText] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        getProjectsFromServerBySearch(searchText)
            .then(projectsRes => {
                props.setProjects(projectsRes)
            }).catch(err => {
                console.log(err)
            });
    }


    return (

        <Navbar collapseOnSelect bg="primary" sticky="top" variant="dark" expand="lg" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="ml-4 mr-4 p-2 color-white link-hover">Home</NavLink>
                    <AuthNavItems />
                </Nav>
                <Form onSubmit={onSubmit} inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                    <Button type="submit" variant="outline-light" >Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )

}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setProjects: (projects) => dispatch({ type: actionType.SET_PROJECTS, projects: projects })
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);