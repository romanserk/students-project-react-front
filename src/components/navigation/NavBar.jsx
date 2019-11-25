import React from 'react';
import { NavLink } from 'react-router-dom'

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AuthNavItems from './AuthNavItems'


const NavBar = () => {

    return (

        <Navbar bg="primary" variant="dark" expand="sm" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="ml-5 mr-5 p-2 color-white link-hover">Home</NavLink>
                    <AuthNavItems />
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default NavBar;