import React from 'react';
import { NavLink } from 'react-router-dom'

import { Navbar, Nav, Form, FormControl, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import AuthNavItems from './AuthNavItems'


const NavBar = () => {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                Sorry currently <strong>disabled</strong>
            </Popover.Content>
        </Popover>
    );

    return (

        <Navbar collapseOnSelect bg="primary" sticky="top" variant="dark" expand="lg" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="ml-4 mr-4 p-2 color-white link-hover">Home</NavLink>
                    <AuthNavItems />
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button variant="outline-light">Search</Button>
                    </OverlayTrigger>

                </Form>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default NavBar;