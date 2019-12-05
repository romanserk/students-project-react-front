import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'

import jwt_decode from 'jwt-decode';


import { login } from './UserFunctions';
import { Alert, Form, Button, Col, Container, Row } from 'react-bootstrap';




const Login = (props) => {

    const [user, setUser] = useState({
        user_name: '',
        password: ''
    })
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);




    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(user => {
            return { ...user, [name]: value };
        });
    }



    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)


        const userToSubmit = {
            user_name: user.user_name,
            password: user.password
        }

        login(userToSubmit)
            .then(res => {
                if (res.response && res.response.data.error) {
                    setError(res.response.data.error)
                } else {
                    localStorage.setItem('user_login', `${localStorage.usertoken}`);
                    props.setLoggedIn(true);
                    props.setUserData(jwt_decode(localStorage.user_login))

                    props.history.push({
                        pathname: `/profile/${userToSubmit.user_name}`,
                        state: { user: userToSubmit.user_name }
                    })

                }
            })
    }


    return (
        <Container>
            <Row className="row">
                <Col className="col-md-6 mt-5 pt-5 mx-auto">
                    <Form onSubmit={onSubmit}>
                        <h2 className="mb-4 font-weight-normal">Login</h2>
                        <Form.Row>
                            <Form.Group as={Col} className="mx-auto" md="12" controlId="validationCustom05">
                                {error && <Alert variant="danger" ><p className="mb-0">{error}</p></Alert>}
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_name"
                                    placeholder="Enter User Name"
                                    required
                                    value={user.user_name}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustom06">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={user.password}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button
                            className="btn-block"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Loading…' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

const mapStateToProps = state => {
    return {
        loggedIn: state.users.isLoggedIn
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: (isLogged) => dispatch({ type: actionType.SET_LOGGED_IN, isLogged: isLogged }),
        setUserData: (userData) => dispatch({ type: actionType.SET_USER_DATA, userData: userData }),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
